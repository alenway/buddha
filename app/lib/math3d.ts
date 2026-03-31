// lib/math3d.ts
// Full 3D rotation using rotation matrices (not just oblique projection).
// Supports rotation around X, Y, Z axes simultaneously — "superposition".

export type Vec3 = [number, number, number];
export type Vec2 = [number, number];
export type Matrix3x3 = [Vec3, Vec3, Vec3];

export interface Face {
  vertices: Vec3[]; // 3D vertices (original)
  projected: Vec2[]; // 2D screen positions after rotation + projection
  normal: Vec3; // face normal after rotation (for backface culling & shading)
  centerZ: number; // average Z for painter's algorithm sorting
  color: string; // base face color
  label: string; // face name
  opacity: number; // computed from lighting
  visible: boolean; // backface culled?
}

// ── Matrix multiply 3×3 × 3×3
export function matMul(a: Matrix3x3, b: Matrix3x3): Matrix3x3 {
  const r: Matrix3x3 = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
      for (let k = 0; k < 3; k++) r[i][j] += a[i][k] * b[k][j];
  return r;
}

// ── Apply 3×3 matrix to a vector
export function matVec(m: Matrix3x3, v: Vec3): Vec3 {
  return [
    m[0][0] * v[0] + m[0][1] * v[1] + m[0][2] * v[2],
    m[1][0] * v[0] + m[1][1] * v[1] + m[1][2] * v[2],
    m[2][0] * v[0] + m[2][1] * v[1] + m[2][2] * v[2],
  ];
}

// ── Rotation matrices
export function rotX(a: number): Matrix3x3 {
  const c = Math.cos(a),
    s = Math.sin(a);
  return [
    [1, 0, 0],
    [0, c, -s],
    [0, s, c],
  ];
}
export function rotY(a: number): Matrix3x3 {
  const c = Math.cos(a),
    s = Math.sin(a);
  return [
    [c, 0, s],
    [0, 1, 0],
    [-s, 0, c],
  ];
}
export function rotZ(a: number): Matrix3x3 {
  const c = Math.cos(a),
    s = Math.sin(a);
  return [
    [c, -s, 0],
    [s, c, 0],
    [0, 0, 1],
  ];
}

// ── Combined rotation: Rx * Ry * Rz  (applied in Z→Y→X order)
export function combinedRotation(
  ax: number,
  ay: number,
  az: number,
): Matrix3x3 {
  return matMul(rotX(ax), matMul(rotY(ay), rotZ(az)));
}

// ── Dot product
export function dot(a: Vec3, b: Vec3): number {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

// ── Cross product
export function cross(a: Vec3, b: Vec3): Vec3 {
  return [
    a[1] * b[2] - a[2] * b[1],
    a[2] * b[0] - a[0] * b[2],
    a[0] * b[1] - a[1] * b[0],
  ];
}

// ── Normalise
export function normalize(v: Vec3): Vec3 {
  const len = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
  if (len === 0) return [0, 0, 1];
  return [v[0] / len, v[1] / len, v[2] / len];
}

// ── Simple orthographic projection (drop Z, scale)
export function project(v: Vec3, scale: number, cx: number, cy: number): Vec2 {
  return [cx + v[0] * scale, cy - v[1] * scale];
}

// ── Compute face normal from first three vertices (counter-clockwise)
export function faceNormal(verts: Vec3[]): Vec3 {
  const ab: Vec3 = [
    verts[1][0] - verts[0][0],
    verts[1][1] - verts[0][1],
    verts[1][2] - verts[0][2],
  ];
  const ac: Vec3 = [
    verts[2][0] - verts[0][0],
    verts[2][1] - verts[0][1],
    verts[2][2] - verts[0][2],
  ];
  return normalize(cross(ab, ac));
}

// ── Face definitions for a box of given half-sizes (hx, hy, hz)
// Each face has 4 vertices (quad), a name, and a base color.
export interface FaceDef {
  verts: Vec3[];
  label: string;
  color: string;
  normalSign: Vec3; // outward normal in object space
}

export function buildBoxFaces(hx: number, hy: number, hz: number): FaceDef[] {
  return [
    {
      label: "Front",
      color: "#3b82f6",
      normalSign: [0, 0, 1],
      verts: [
        [-hx, -hy, hz],
        [hx, -hy, hz],
        [hx, hy, hz],
        [-hx, hy, hz],
      ],
    },
    {
      label: "Back",
      color: "#8b5cf6",
      normalSign: [0, 0, -1],
      verts: [
        [hx, -hy, -hz],
        [-hx, -hy, -hz],
        [-hx, hy, -hz],
        [hx, hy, -hz],
      ],
    },
    {
      label: "Top",
      color: "#10b981",
      normalSign: [0, 1, 0],
      verts: [
        [-hx, hy, hz],
        [hx, hy, hz],
        [hx, hy, -hz],
        [-hx, hy, -hz],
      ],
    },
    {
      label: "Bottom",
      color: "#f59e0b",
      normalSign: [0, -1, 0],
      verts: [
        [-hx, -hy, -hz],
        [hx, -hy, -hz],
        [hx, -hy, hz],
        [-hx, -hy, hz],
      ],
    },
    {
      label: "Right",
      color: "#ef4444",
      normalSign: [1, 0, 0],
      verts: [
        [hx, -hy, hz],
        [hx, -hy, -hz],
        [hx, hy, -hz],
        [hx, hy, hz],
      ],
    },
    {
      label: "Left",
      color: "#ec4899",
      normalSign: [-1, 0, 0],
      verts: [
        [-hx, -hy, -hz],
        [-hx, -hy, hz],
        [-hx, hy, hz],
        [-hx, hy, -hz],
      ],
    },
  ];
}

// Light direction (normalised) — fixed in world space
const LIGHT: Vec3 = normalize([0.6, 0.8, 1.0]);
const AMBIENT = 0.35;

// ── Project all faces given a rotation matrix
export function projectFaces(
  faceDefs: FaceDef[],
  rotMat: Matrix3x3,
  scale: number,
  cx: number,
  cy: number,
): Face[] {
  const camera: Vec3 = [0, 0, 1]; // looking down +Z

  return faceDefs.map((fd) => {
    // Rotate all vertices
    const rotVerts = fd.verts.map((v) => matVec(rotMat, v));

    // Rotate the face normal
    const rotNormal = matVec(rotMat, fd.normalSign);

    // Backface culling: if normal faces away from camera, skip
    const ndotc = dot(rotNormal, camera);
    const visible = ndotc > 0;

    // Diffuse lighting
    const diffuse = Math.max(0, dot(rotNormal, LIGHT));
    const brightness = AMBIENT + (1 - AMBIENT) * diffuse;

    // Average Z for painter's sort
    const centerZ = rotVerts.reduce((s, v) => s + v[2], 0) / rotVerts.length;

    // Project to 2D
    const projected = rotVerts.map((v) => project(v, scale, cx, cy));

    return {
      vertices: rotVerts,
      projected,
      normal: rotNormal,
      centerZ,
      color: fd.color,
      label: fd.label,
      opacity: brightness,
      visible,
    };
  });
}

// ── Sort faces back-to-front (painter's algorithm)
export function sortFaces(faces: Face[]): Face[] {
  return [...faces].sort((a, b) => a.centerZ - b.centerZ);
}

// ── Foreshortening measurements from rotation matrix
// Given the rotation matrix and original dimensions (W, D, H),
// compute what is "visible" along each axis.
export interface ForeshortMeasurements {
  // How much of each original axis is projected onto screen X
  visibleWidthFromX: number; // W component along screen X
  visibleWidthFromZ: number; // D component along screen X
  // How much is projected onto screen Y
  visibleHeightFromY: number; // H component along screen Y
  visibleHeightFromZ: number; // D component along screen Y
  // The actual bounding box of the projected shape
  screenWidth: number;
  screenHeight: number;
  // Simple foreshortening ratios (cos/sin for Y-axis rotation)
  rotY_deg: number;
  rotX_deg: number;
  frontFaceWidth: number;
  frontFaceHeight: number;
  sideFaceWidth: number;
  topFaceHeight: number;
}

export function computeMeasurements(
  rotMat: Matrix3x3,
  W: number,
  D: number,
  H: number,
  rotXDeg: number,
  rotYDeg: number,
): ForeshortMeasurements {
  const ryRad = (rotYDeg * Math.PI) / 180;
  const rxRad = (rotXDeg * Math.PI) / 180;
  return {
    visibleWidthFromX: W * Math.abs(rotMat[0][0]),
    visibleWidthFromZ: D * Math.abs(rotMat[0][2]),
    visibleHeightFromY: H * Math.abs(rotMat[1][1]),
    visibleHeightFromZ: D * Math.abs(rotMat[1][2]),
    screenWidth: W * Math.abs(Math.cos(ryRad)),
    screenHeight: H * Math.abs(Math.cos(rxRad)),
    rotY_deg: rotYDeg,
    rotX_deg: rotXDeg,
    frontFaceWidth: W * Math.abs(Math.cos(ryRad)),
    frontFaceHeight: H * Math.abs(Math.cos(rxRad)),
    sideFaceWidth: D * Math.abs(Math.sin(ryRad)),
    topFaceHeight: D * Math.abs(Math.sin(rxRad)),
  };
}
