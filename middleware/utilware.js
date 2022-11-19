import User from "models/User";
import Post from "models/Post";
import Book from "models/Book";
import Audio from "models/Audio";

export async function saveImageToDB(filename, id) {
  try {
    await User.updateOne(
      {
        _id: id,
      },
      {
        profileImage: filename,
      }
    );
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
export async function savePostImageToDB(filename, id) {
  try {
    await Post.updateOne(
      {
        _id: id,
      },
      {
        featuredImage: filename,
      }
    );
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
export async function saveAudioImageToDB(filename, id) {
  try {
    await Audio.updateOne(
      {
        _id: id,
      },
      {
        image_url: filename,
      }
    );
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
export async function saveBookImageToDB(filename, id) {
  try {
    await Book.updateOne(
      {
        _id: id,
      },
      {
        image_url: filename,
      }
    );
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
export async function saveBookPDFToDB(filename, id) {
  try {
    await Book.updateOne(
      {
        _id: id,
      },
      {
        url: filename,
      }
    );
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
