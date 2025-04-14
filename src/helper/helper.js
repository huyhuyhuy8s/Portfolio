import sliderConfig from "../config/sliderConfig";

// Helper function to get image path
const getImagePath = (index) => {
  return `${sliderConfig.imagePaths.basePath}${index}${sliderConfig.imagePaths.extension}`;
};

export default getImagePath
