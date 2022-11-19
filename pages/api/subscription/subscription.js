import dbConnect from "libs/dbConnect";
import Subscriptions from "models/Subscription";
import Category from "models/Category";

export default async function handler(req, res) {
  await dbConnect();

  req.method === "POST"
    ? post(req, res)
    : req.method === "PATCH"
    ? patch(req, res)
    : req.method === "PUT"
    ? console.log("PUT")
    : req.method === "DELETE"
    ? delete_subscription(req, res)
    : req.method === "GET"
    ? get(req, res)
    : res.status(404).send("");
}

const get = async (req, res) => {
  const { sid } = req.query;
  let subscription;
  try {
    subscription = await Subscriptions.findById(sid);
    if (subscription == null) {
      return res.status(404).json({ message: "Cannot find subscription" });
    } else {
      res.status(200).json({ subscription: subscription });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message, subscription: {} });
  }

  return subscription;
};

const post = async (req, res) => {
  const subscription = new Subscriptions({
    subscriber: req.body.subscriber,
    plan: req.body.plan,
    duration: req.body.duration,
    status: req.body.status,
    date_created: req.body.date_created,
  });
  try {
    const newsubscription = await subscription.save();
    res.status(201).json({ message: "cool" });
  } catch (err) {
    console.log(err.message);
    res.status(401).json({ message: err.message });
  }
};

const patch = async (req, res) => {
  try {
    await Subscriptions.updateOne(
      {
        _id: req.body.id,
      },
      {
        // subscriber: req.body.subscriber,
        plan: req.body.plan,
        duration: req.body.duration,
        status: req.body.status,
        date_created: req.body.date_created,
      }
    );
    res.status(200).json({ message: "Subscription Updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const delete_subscription = async (req, res) => {
  try {
    const dsubscription = await Subscriptions.deleteOne({ _id: req.query.sid });
    res.status(200).json(dsubscription);
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: err.message });
  }
};
