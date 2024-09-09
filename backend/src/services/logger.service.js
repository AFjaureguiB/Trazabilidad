import winston, { format } from "winston";

const logger = winston.createLogger({
  level: "info",
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [new winston.transports.File({ filename: "user-activity.log" })],
});

export const logUserActivity = (
  username,
  role,
  process,
  action,
  updatedData
) => {
  logger.info(
    `User: ${username} | Role: ${role} | Process: ${process} | Action: ${action} | Updated Data: ${JSON.stringify(
      updatedData
    )}`
  );
};
