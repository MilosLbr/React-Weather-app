const importAll = (req) => {
    // import all weahter icon images, and background images
    let images = {}
    
    req.keys().forEach(elem => {
        // correct the string for easier manipulation
        let correctedElem = elem.replace('./','');
        correctedElem = correctedElem.replace('.png','');
        correctedElem = correctedElem.replace('.jpg','');
        images[correctedElem] = req(elem);
    
    });
    return images;
}
  
const iconImages = importAll(require.context('../../images/icon_images', false, /\.png$/));

const backgroundImages = importAll(require.context('../../images/background_images', false, /\.png$|\.jpg$/));


module.exports = {
    iconImages,
    backgroundImages
}
