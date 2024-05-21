import uploadImage from "@/modules/daybook/helpers/uploadImage";
import axios from "axios";
import cloudinary from 'cloudinary'

cloudinary.config({
  cloud_name: "drxnksumt",
  api_key: "884561869643391",
  api_secret: "pYaAcL7mYC2TdFG_viMwxPVX-DM",
});

describe("Pruebas en el uploadImage", () => {
  test("debe de cargar un archivo y retornar el url", async () => {
    const { data } = await axios.get(
      "https://res.cloudinary.com/drxnksumt/image/upload/v1716208267/nlgrsplfjabvda6mbszy.jpg",
      {
        responseType: "arraybuffer",
      }
    );

    const file = new File([data], "foto.jpg");

    const url = await uploadImage(file);

    expect(typeof url).toBe("string");

    // Tomar el ID
    const segments = url.split("/");
    const imageId = segments[segments.length - 1].replace(".jpg", "");
    cloudinary.v2.api.delete_resources(imageId, {}, () => {
      done();
    });
  });
});
