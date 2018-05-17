import {Mesh, BoxGeometry, TextureLoader, MeshBasicMaterial, BackSide} from "three";

const _ = {
  defaultSkybox: "clouds",
  skyboxNames: {
    clouds: "clouds", interstellar: "interstellar",
    moon: "moon", ocean: "ocean", sand: "sand",
    space: "space", storm: "storm", sunset: "sunset"
  },
  filesNameTab: ["right", "left", "top", "bottom", "back", "front"],
  filesNameExtension: ".png",
  defaultSize: 10000,
  defaultColor: 0x00A080
};
_.defaultSizeBox = [_.defaultSize, _.defaultSize, _.defaultSize];

class Skybox extends Mesh{
  constructor(skyboxName = Skybox.SKYBOX_CLOUDS){
    const geometry = new BoxGeometry(..._.defaultSizeBox);
    const material = new MeshBasicMaterial({color: _.defaultColor});
    super(geometry, material);
    this.material = [];

    const textureNameTab = _.filesNameTab.map((filesName) => {
      const relativeFilePath = skyboxName + "/" + filesName + _.filesNameExtension;
      return require("../../../Asset/Skybox/" + relativeFilePath);
    });

    const loader = new TextureLoader();
    textureNameTab.forEach((item, index) => {
      loader.load(
        item,
        (texture) => {
          this.material[index] = new MeshBasicMaterial({map: texture, side: BackSide});
        }
      );
    });
  }
}

// Add Static Attribute
Skybox.SKYBOX_CLOUDS = _.skyboxNames.clouds;
Skybox.SKYBOX_INTERSTELLAR = _.skyboxNames.interstellar;
Skybox.SKYBOX_MOON = _.skyboxNames.moon;
Skybox.SKYBOX_OCEAN = _.skyboxNames.ocean;
Skybox.SKYBOX_SAND = _.skyboxNames.sand;
Skybox.SKYBOX_SPACE = _.skyboxNames.space;
Skybox.SKYBOX_STORM = _.skyboxNames.storm;
Skybox.SKYBOX_SUNSET = _.skyboxNames.sunset;

export default Skybox;