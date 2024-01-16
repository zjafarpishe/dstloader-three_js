import DSTLoader from "./DSTLoader.js";

export default function Test({
  THREE,
  scene,
  camera,
  controls,

}) {
  //scene.background = new THREE.Color(0xffffff);
  //scene.add(new THREE.HemisphereLight(0xffffcc, 0x333399, 1.0));

  camera.position.set(0, 0.0, 15); //9,0,-15)
  controls.target.set(0, 0.0, 0);
  let dstLoader = new DSTLoader(THREE);


  let texLoader = new THREE.TextureLoader();
  texLoader.load(
    "https://cdn.glitch.global/edbdef61-a0c3-47c3-af4b-5df29e88dec7/NormalMap%20(10).png?v=1705350892869",
    (normalMap) => {
      new THREE.TextureLoader().load(
        "https://cdn.glitch.global/edbdef61-a0c3-47c3-af4b-5df29e88dec7/image%20(73).jpg?v=1705345380813",
        (tex) => {
          tex.colorSpace = THREE.SRGBColorSpace;
          tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
          normalMap.wrapS = normalMap.wrapT = THREE.RepeatWrapping;
          normalMap.colorSpace = THREE.LinearSRGBColorSpace;

          let loadDST = (url, cbfn, options) => {
            dstLoader.load(
              url,
              (lines) => {
                scene.add(lines.mesh);
                lines.mesh.material.map = tex;
                lines.mesh.material.normalMap = normalMap;
                lines.drawRange = 1;
              
               
             
                cbfn(lines);
              },
              options
            );
          };
         

          loadDST(
            "1112.DST",
            (lines) => {
              lines.mesh.position.x =0;
            },
            {
              threadThickness: 2,
              jumpThreadThickness: 0.01,
              palette: ["orange", "white", "pink", "white", "black"],
            }
          );

        }
      );
    }
  );

}
