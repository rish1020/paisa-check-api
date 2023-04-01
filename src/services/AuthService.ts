import { Request, Response, NextFunction } from "express";
import { getUserByEmail, createNewUser } from "../dao/UsersDao";
import { ResponseEntity } from "../interfaces/ResponseEntity";
import { TokenPayload, User } from "../interfaces/User";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

export async function signUp(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password, name, image } = req.body;

    const oldUser = await getUserByEmail(email);
    if (oldUser) {
      return res.status(403).send("User already exists");
    }

    //Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);

    const user: Partial<User> = {
      name,
      email: email.toLowerCase(),
      password: encryptedPassword,
      image,
    };
    const newUser = await createNewUser(user);

    const token = generateNewToken(newUser.insertedId.toString(), email);
    const response: ResponseEntity = {
      ok: newUser.insertedId.toString() ? true : false,
      data: {
        _id: user._id,
        token,
        email,
        name,
        image,
      },
    };
    return res.send(response);
  } catch (error) {
    next(error);
  }
}

export async function signIn(req: Request, res: Response, next: NextFunction) {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = (await getUserByEmail(email.toLowerCase())) as User;

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = generateNewToken(user._id.toString(), email);
      const response: ResponseEntity = {
        ok: user._id ? true : false,
        data: {
          _id: user._id,
          token,
          email,
          name: user.name,
          image: user.image,
        },
      };
      return res.send(response);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    next(err);
  }
}

export async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).send("Access Denied!");
  }
  try {
    const verified = jwt.verify(token, process.env.TOKEN_KEY || "");
    console.log("calling next ");
    next();
  } catch (error) {
    res.status(400).send("Invalid token!");
  }
}

function generateNewToken(userId: string, email: string) {
  const payload: TokenPayload = {
    email,
    userId,
  };
  // Create token
  const token = jwt.sign(payload, process.env.TOKEN_KEY || "", {
    expiresIn: "1y",
  });
  return token;
}
