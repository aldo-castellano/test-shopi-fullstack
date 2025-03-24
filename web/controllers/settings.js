import { Settings } from "../models/index.js";

export const settingsController = {
  /**
   * @param {import("express").Request} req
   * @param {import("express").Response} res
   * @description Retrieve a summary of the integration status
   */
  async find(req, res) {
    try {
      const { shop } = req.query;
      const findSettings = await Settings.findOne({ shopName: shop });

      res.status(200).json({ findSettings });
    } catch (error) {
      console.log(error);

      res.status(400).send();
    }
  },
  async create(req, res) {
    const { ip, port, user, password, shopName } = req.body;

    if (!ip || !port || !user || !password || !shopName) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    try {
      const newSettings = await Settings.findOneAndUpdate(
        { shopName: shopName },
        {
          $set: {
            ip,
            port,
            user,
            password,
          },
        },
        { upsert: true, new: true }
      );

      console.log("create");
      await newSettings.save();

      res
        .status(200)
        .json({ message: "Settings saved successfully", data: newSettings });
    } catch (error) {
      console.log(error);

      res.status(400).send();
    }
  },
};
