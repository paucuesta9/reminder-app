import jwt from "jsonwebtoken";

export default function reminder(req, res) {
  if (req.method === "GET") {
    const token = req.headers.authorization;
    // remove the Bearer part
    const tokenWithoutBearer = token.split(" ")[1];
    try {
      jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET)

      const { id } = req.query;

      let reminders = [
        {
          id: 1,
          title: "Recordatori 1",
          description: "Descripció del recordatori 1",
          date: new Date(),
          done: false,
        },
        {
          id: 2,
          title: "Recordatori 2",
          description: "Descripció del recordatori 2",
          date: new Date(),
          done: false,
        },
        {
          id: 3,
          title: "Recordatori 3",
          description: "Descripció del recordatori 3",
          date: new Date(),
          done: false,
        },
        {
          id: 4,
          title: "Recordatori 4",
          description: "Descripció del recordatori 4",
          date: new Date(),
          done: false
        },
        {
          id: 5,
          title: "Recordatori 5",
          description: "Descripció del recordatori 5",
          date: new Date(),
          done: false
        },
        {
          id: 6,
          title: "Recordatori 6",
          description: "Descripció del recordatori 6",
          date: new Date(),
          done: false
        }
      ];

      const reminder = reminders.find(reminder => reminder.id === parseInt(id));
      res.status(200).json(reminder);
    } catch (error) {
      res.status(401).json({ message: "Unauthorized" });
    }
  }
}
