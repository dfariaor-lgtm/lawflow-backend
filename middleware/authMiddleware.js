import jwt from "jsonwebtoken";

export default function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2) {
    return res.status(401).json({ error: "Token malformado" });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ error: "Token malformado" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "devsecret"
    );

    req.user = decoded;
    return next();
  } catch (err) {
    console.error("JWT ERROR:", err.message);

    return res.status(401).json({
      error: "Token inválido",
    });
  }
}
