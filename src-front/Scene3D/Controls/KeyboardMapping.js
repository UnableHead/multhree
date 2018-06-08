import {BoxGeometry, ConeGeometry, DodecahedronGeometry, IcosahedronGeometry, OctahedronGeometry,
        SphereGeometry, TetrahedronGeometry, TorusGeometry, TextGeometry} from "three";

const keyMapping = [
  {
    code: 97, // a
    GeometryClass: BoxGeometry,
    parameter: () => {
      const size = 20;
      return [size, size, size];
    }
  },
  {
    code: 122, // z
    GeometryClass: ConeGeometry,
    parameter: () => {
      const radius = 15,
            height = 20;
      return [radius, height];
    }
  },
  {
    code: 101, // e
    GeometryClass: DodecahedronGeometry,
    parameter: () => {
      const radius = 15;
      return [radius];
    }
  },
  {
    code: 114, // r
    GeometryClass: IcosahedronGeometry,
    parameter: () => {
      const radius = 15;
      return [radius];
    }
  },
  {
    code: 116, // t
    GeometryClass: OctahedronGeometry,
    parameter: () => {
      const radius = 15;
      return [radius];
    }
  },
  {
    code: 121, // y
    GeometryClass: SphereGeometry,
    parameter: () => {
      const radius = 15;
      return [radius];
    }
  },
  {
    code: 117, // u
    GeometryClass: TetrahedronGeometry,
    parameter: () => {
      const radius = 15;
      return [radius];
    }
  },
  {
    code: 105, // i
    GeometryClass: TorusGeometry,
    parameter: () => {
      const radius = 15,
            tube = 3,
            radialSegments = 7,
            tubularSegments = 15;
      return [radius, tube, radialSegments, tubularSegments];
    }
  },
  {
    code: 111, // o
    GeometryClass: TextGeometry,
    parameter: () => {
      const radius = 15;
      return [radius];
    }
  }
  /* {
    code: 112, // p
    GeometryClass: TorusGeometry,
    parameter: () => {
      const radius = 15;
      return [radius];
    }
  }*/
];

export default keyMapping;