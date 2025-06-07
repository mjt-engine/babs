import { Inputs as W } from "@mjt-engine/input";
import { toVec3 as k, Maths as V, toVec2 as Me } from "@mjt-engine/math";
import * as b from "@babylonjs/core";
import { Vector3 as j, Engine as qe, Matrix as be, Scene as F, UniversalCamera as oe, Camera as O, TargetCamera as je, ArcRotateCamera as ae, FreeCamera as et, WebXRCamera as tt, HemisphericLight as Ce, PointLight as Te, Color4 as z, Color3 as Se, StandardMaterial as D, PBRMaterial as rt, Mesh as A, MeshBuilder as v, SolidParticleSystem as se, InstancedMesh as nt, Texture as B, WebGPUEngine as Ee, SceneLoader as pe, DynamicTexture as ie, HtmlElementTexture as ot, GlowLayer as Pe, HighlightLayer as at, TransformNode as st, Ray as it, Constants as ct, SpritePackedManager as lt, SpriteManager as ut, Sprite as dt, Curve3 as ht } from "@babylonjs/core";
import { isUndefined as N, isDefined as w, iff as x, tuple2 as gt, tuple3 as ft, Arrays as pt } from "@mjt-engine/object";
import { Colors as E } from "@mjt-engine/color";
import { extent as me } from "d3-array";
import { Asserts as _, assertValue as mt } from "@mjt-engine/assert";
import "@babylonjs/inspector";
import { Randoms as ve } from "@mjt-engine/random";
import { Images as yt } from "@mjt-engine/image";
import { Noises as wt } from "@mjt-engine/noise";
function y(e = 0, r = 0, t = 0) {
  if (typeof e == "number")
    return new j(e, r, t);
  const [n = 0, o = 0, a = 0] = k(e);
  return new j(n, o, a);
}
const Re = (e, r) => {
  const t = e.alpha, n = e.beta, o = e.radius;
  e.target = e.target.add(y(r)), e.radius = o, e.alpha = t, e.beta = n;
}, Ae = (e, r = {}) => {
  const {
    keySensitivity: t = 0.5,
    mouseSensitivity: n = 0.05,
    parent: o = document.body,
    action: a = () => {
    }
  } = r, s = e.alpha, i = e.beta, l = e.radius;
  y(e.target);
  const c = (f = 0, u = 0, h = 0) => {
    Re(e, [f, u, h]), a();
  }, p = W.listenToKey(
    {
      // Y up
      w: () => {
        c(-t / 2, t / 2, 0);
      },
      "shift+w": () => {
        e.radius -= t;
      },
      // X left
      a: () => {
        c(-t / 2, -t / 2, 0);
      },
      "shift+s": () => {
        e.radius += t;
      },
      // Y down
      s: () => {
        c(t / 2, -t / 2, 0);
      },
      // X right
      d: () => {
        c(t / 2, t / 2, 0);
      },
      v: () => {
        e.beta = e.beta + t / 8, a();
      },
      z: () => {
        e.beta = e.beta - t / 8, a();
      },
      c: () => {
        e.alpha = s, e.beta = i, e.radius = l, a();
      },
      "shift+d": () => {
        e.alpha = e.alpha + t / 8, a();
      },
      "shift+a": () => {
        e.alpha = e.alpha - t / 8, a();
      }
    },
    {
      autoUp: !1,
      parent: o
    }
  ), g = {
    lastPosition: void 0
  };
  o.addEventListener("pointerdown", (f) => {
    f.buttons === 4 && (g.lastPosition = f);
  }), o.addEventListener("pointermove", (f) => {
    if (f.buttons !== 4)
      return;
    const { lastPosition: u = f } = g;
    g.lastPosition = f;
    const h = V.subtract2(u, f), [m, M] = Me(h);
    if (f.buttons === 4 && f.shiftKey) {
      e.beta = e.beta + M * n;
      return;
    }
    f.buttons === 4 && (c(M * n, -M * n, 0), c(m * n, m * n, 0));
  });
  const d = W.listenToMouse(
    {
      wheel: (f) => {
        if (f instanceof WheelEvent) {
          const u = f.deltaY * n;
          e.radius += u, a();
        }
      }
    },
    {
      parent: o
    }
  );
  return [p, d];
}, Ie = ({
  width: e = 320,
  height: r = 320
}) => {
  const t = document.createElement("canvas");
  return t.width = e, t.height = r, t;
}, H = (e) => {
  const r = e instanceof HTMLCanvasElement || e instanceof OffscreenCanvas ? {} : e ?? {}, t = e instanceof HTMLCanvasElement || e instanceof OffscreenCanvas ? e : Ie({
    width: e?.width ?? 320,
    height: e?.height ?? 320
  }), { antialias: n, xrCompatible: o = !0 } = r, a = new qe(t, n, {
    powerPreference: "high-performance",
    xrCompatible: o,
    ...r
  });
  return a.hideLoadingUI(), a;
}, ye = (e, r, t, n = {}) => {
  const { camera: o = e.activeCamera, predicate: a = () => !0 } = n, s = e.createPickingRay(r, t, be.Identity(), o);
  return e.pickWithRay(s, a)?.pickedMesh;
}, ee = (e, r) => {
  if (e instanceof F)
    return e.meshes.forEach((t) => ee(t, r));
  r(e), e.getChildMeshes().forEach((t) => ee(t, r));
}, xt = (e, r = {}) => {
  const {
    keySensitivity: t = 0.05,
    mouseSensitivity: n = 0.05,
    parent: o = document.body
  } = r;
  W.listenToKey(
    {
      w: () => {
        e.position.addInPlace(y(0, 0, -t));
      },
      a: () => {
        e.rotation.y -= t / 2;
      },
      s: () => {
        e.position.addInPlace(y(0, 0, t));
      },
      d: () => {
        e.rotation.y += t / 2;
      },
      i: () => {
        e.position.addInPlace(y(0, t, 0));
      },
      j: () => {
        e.position.addInPlace(y(t, 0, 0));
      },
      k: () => {
        e.position.addInPlace(y(0, -t, 0));
      },
      l: () => {
        e.position.addInPlace(y(-t, 0, 0));
      }
    },
    {
      propagate: !1,
      parent: o
    }
  ), W.listenToMouse(
    {
      wheel: (a) => {
        if (a instanceof WheelEvent) {
          if (a.shiftKey) {
            const i = a.deltaX * n;
            e.position.addInPlace(y(0, -i, 0));
            return;
          }
          const s = a.deltaY * n;
          e.position.addInPlace(y(0, 0, s));
        }
      },
      click: (a) => {
        if (a.buttons === 0) {
          const s = a, i = e.getScene(), l = ye(i, s.layerX, s.layerY);
          w(l) && (console.log({ mesh: l }), ee(i, (c) => {
            N(c.material) || c.material && (c.material.wireframe = !1);
          }), l.material && (l.material.wireframe = !0));
        }
      },
      auxclick: (a) => {
        if (a.button !== 1)
          return;
        const s = e.getScene(), i = ye(s, a.clientX, a.clientY);
        N(i);
      },
      contextmenu: (a) => {
        console.log("should context");
      }
    },
    {
      propagate: !1,
      parent: o
    }
  );
}, Mt = (e, r, {
  unitsTall: t = 1,
  unitsWide: n = 1,
  cameraLevel: o = -100,
  disposeActive: a = !1
} = {}) => {
  a && e?.activeCamera?.dispose();
  const s = new oe(r, y(0, 0, o), e);
  return s.target = y(0, 0, 0), s.rotation = y(0, 0, Math.PI), s.orthoTop = -t / 2, s.orthoBottom = t / 2, s.orthoLeft = n / 2, s.orthoRight = -n / 2, s.mode = O.ORTHOGRAPHIC_CAMERA, s;
}, U = (e, r, t) => {
  const n = e.getCameraByName(r);
  return w(n) ? n : t();
}, $ = (e, r) => {
  const {
    alpha: t,
    beta: n,
    radius: o,
    target: a,
    position: s,
    rotation: i,
    minZ: l,
    maxZ: c,
    mode: p,
    orthoTop: g,
    orthoBottom: d,
    orthoLeft: f,
    orthoRight: u
  } = r;
  x(s, (h) => {
    e.position = y(h);
  }), x(l, (h) => {
    e.minZ = h;
  }), x(c, (h) => {
    e.maxZ = h;
  }), x(p, (h) => {
    e.mode = we[h];
  }), x(p, (h) => {
    e.mode = we[h];
  }), x(g, (h) => {
    e.orthoTop = h;
  }), x(d, (h) => {
    e.orthoBottom = h;
  }), x(f, (h) => {
    e.orthoLeft = h;
  }), x(u, (h) => {
    e.orthoRight = h;
  }), e instanceof je && (x(i, (h) => {
    e.rotation = y(h);
  }), x(a, (h) => {
    e.target = y(h);
  })), e instanceof ae && (x(t, (h) => {
    e.alpha = h;
  }), x(n, (h) => {
    e.beta = h;
  }), x(o, (h) => {
    e.radius = h;
  }));
}, bt = (e, r, t = {}) => {
  const n = U(e, r, () => {
    const { alpha: o = 0, beta: a = 0, radius: s = 2, target: i } = t;
    return new ae(r, o, a, s, y(i), e);
  });
  return $(n, t), n;
}, Ct = (e, r, t = {}) => {
  const n = U(e, r, () => {
    const { position: o } = t;
    return new oe(r, y(o), e);
  });
  return $(n, t), n;
}, Tt = (e, r) => {
  e?.activeCamera?.dispose();
  const t = e.getEngine().getRenderingCanvas(), n = -Math.PI / 2, o = Math.PI / 2.5, a = new ae(r, n, o, 15, y(0, 0, 0), e);
  a.attachControl(t, !0), a.mode = O.PERSPECTIVE_CAMERA;
}, St = (e, r, t = {}) => {
  const n = U(e, r, () => {
    const { position: o = [0, 0, 0] } = t;
    return new et(r, jt.v3(o), e);
  });
  return $(n, t), n;
}, Et = (e, r, t, n = {}) => {
  const o = U(e, r, () => new tt(r, e, t));
  return $(o, n), o;
}, we = {
  orthographic: O.ORTHOGRAPHIC_CAMERA,
  perspective: O.PERSPECTIVE_CAMERA
}, X = {
  getArcRotateCamera: bt,
  getCamera: U,
  updateCamera: $,
  getUniversalCamera: Ct,
  getFreeCamera: St,
  getWebXrCamera: Et,
  attachArcRotateCameraControls: Ae,
  attachUniversalCameraControls: xt,
  createTopDownCamera: Mt,
  createDebugCamera: Tt
}, ce = (e, r, t) => {
  const n = e.getLightByName(r);
  return w(n) ? n : t();
}, le = (e, r) => {
  const { intensity: t, direction: n, position: o } = r;
  x(t, (a) => {
    e.intensity = a;
  }), e instanceof Ce && x(n, (a) => {
    e.direction = y(a);
  }), e instanceof Te && x(o, (a) => {
    e.position = y(a);
  });
}, Pt = (e, r, t = {}) => {
  const n = ce(e, r, () => {
    const { direction: o } = t;
    return new Ce(r, y(o), e);
  });
  return le(n, t), n;
}, vt = (e, r, t = {}) => {
  const n = ce(e, r, () => {
    const { position: o } = t;
    return new Te(r, y(o), e);
  });
  return le(n, t), n;
}, Z = {
  getLight: ce,
  getHemisphericLight: Pt,
  getPointLight: vt,
  updateLight: le
}, Y = (e) => {
  const r = E.builder({ color: e }), t = z.FromHexString(r.hex());
  return t.a = r.alpha(), t;
}, P = (e, r, t, n = !1) => {
  const o = e.getMeshByName(r);
  return w(o) && !n ? o : w(o) && n ? t(o) : t();
}, S = (e) => {
  const r = E.builder({ color: e }).hex();
  return Se.FromHexString(r);
}, Le = (e, r, t) => {
  const {
    alpha: n,
    diffuseTexture: o,
    emissiveTexture: a,
    ambientTexture: s,
    opacityTexture: i,
    diffuseColor: l,
    specularColor: c,
    ambientColor: p,
    emissiveColor: g
  } = t;
  x(o, (d) => {
    const f = e.getTextureByName(d);
    r.diffuseTexture = f;
  }), x(a, (d) => {
    const f = e.getTextureByName(d);
    r.emissiveTexture = f;
  }), x(s, (d) => {
    const f = e.getTextureByName(d);
    r.ambientTexture = f;
  }), x(i, (d) => {
    const f = e.getTextureByName(d);
    r.opacityTexture = f;
  }), x(l, (d) => {
    r.diffuseColor = S(d);
    const f = E.from(d).alpha();
    f < 1 && (r.alpha = f);
  }), x(c, (d) => {
    r.specularColor = S(d);
  }), x(p, (d) => {
    r.ambientColor = S(d);
  }), x(g, (d) => {
    r.emissiveColor = S(d);
  }), x(n, (d) => {
    r.alpha = d;
  });
}, te = (e, r, t) => {
  r instanceof D && Le(e, r, t);
}, G = (e, r, t = "standard") => {
  const n = e.getMaterialByName(r);
  if (w(n))
    return n;
  const o = typeof t == "string" ? t : t?.type ?? "standard";
  switch (o) {
    case "standard": {
      const a = new D(r, e);
      return te(e, a, t), a;
    }
    case "pbr": {
      const a = new rt(r, e);
      return te(e, a, t), a;
    }
    default:
      throw new Error(`Unknown material type: '${o}'`);
  }
}, R = (e, r, t) => {
  const { position: n, color: o, material: a, receiveShadows: s } = t;
  r instanceof A && w(a) && (r.material = G(e, a, "standard")), r instanceof A && w(s) && (r.receiveShadows = s), x(n, (i) => {
    r.position = y(i);
  }), x(o, (i) => {
    const l = r.material;
    if (l instanceof D) {
      l.diffuseColor = S(i);
      const c = E.from(i).alpha();
      c < 1 && (l.alpha = c), l.specularColor = S("black"), l.ambientColor = S(i), l.emissiveColor = S(i);
    }
  });
}, Be = (e, r, t = {}) => P(e, r, () => {
  const { width: n = 1, height: o = 1, depth: a = 1, colors: s } = t, i = v.CreateBox(
    r,
    {
      width: n,
      height: o,
      depth: a,
      faceColors: w(s) ? s.map(Y) : void 0
    },
    e
  );
  return R(e, i, t), i;
}), Ne = (e, r, t) => {
  const {
    width: n = 1,
    height: o = 1,
    depth: a = 1,
    material: s,
    receiveShadows: i = !1
  } = t, l = `box-instance-root-${JSON.stringify([
    n,
    o,
    a,
    s,
    i
  ])}`;
  let c = e.getMeshByName(l);
  if (N(c)) {
    if (c = v.CreateBox(l, { width: n, height: o, depth: a }, e), c.receiveShadows = i, c.isVisible = !1, !s)
      throw new Error("No material", { cause: t });
    c.material = G(e, s, "standard");
  }
  const p = c.createInstance(r);
  return R(e, p, t), p;
}, Rt = (e, r, t) => {
  const { radius: n = 0.5 } = t;
  return P(e, r, () => {
    const o = v.CreateSphere(
      r,
      { diameter: n * 2 },
      e
    );
    return R(e, o, t), o;
  });
}, At = (e, r, t, n = {}) => {
  const {
    predicate: o = (l) => l.isPickable,
    camera: a = e.activeCamera
  } = n, s = e.createPickingRay(r, t, be.Identity(), a);
  return e.pickWithRay(s, o)?.pickedMesh;
}, It = (e) => {
  e.computeWorldMatrix(!0), e.refreshBoundingInfo({});
  const [r, t, n] = k(e.getAbsolutePosition()), o = e.getBoundingInfo().boundingSphere.radius;
  return [r, t, n - o];
}, re = (e, r) => {
  if (e instanceof F)
    return e.meshes.forEach((t) => re(t, r));
  r(e), e.getChildMeshes().forEach((t) => re(t, r));
}, Lt = {
  tetrahedron: 0,
  octahedron: 1,
  dodecahedron: 2,
  icosahedron: 3,
  rhombicuboctahadron: 4,
  triangularPrism: 5,
  pentagonalPrism: 6,
  hexagonalPrism: 7,
  squarePyramid: 8,
  pentagonalPyramid: 9,
  triangularDipyramid: 10,
  pentagonalDipryramid: 11,
  elongatedSquareDipyramid: 12,
  elongatedPentagonalDipyramid: 13,
  elongatedPentagonalCupola: 14
}, Bt = (e, r, t = {}) => P(e, r, () => {
  const { size: n = 1, type: o = "tetrahedron" } = t, a = v.CreatePolyhedron(
    r,
    { type: Lt[o], size: n },
    e
  );
  return R(e, a, t), a;
}), Nt = (e) => {
  const r = e.getBoundingInfo().boundingBox.vectors, t = e.getScene(), n = t.getEngine().getRenderingCanvas();
  if (!n)
    throw new Error("No canvas for scene", { cause: t });
  const o = e.getWorldMatrix(), a = t.getTransformMatrix(), s = t.activeCamera.viewport, i = r.map((f) => {
    const u = j.Project(f, o, a, s);
    return u.x = u.x * n.clientWidth, u.y = u.y * n.clientHeight, u;
  }), [l, c] = me(i, (f) => f.x), [p, g] = me(i, (f) => f.y);
  return {
    width: c - l,
    height: g - p,
    left: l,
    top: p,
    right: c,
    bottom: g
  };
}, _t = (e, r, t = {}) => {
  const {
    recurse: n = !0,
    disposeMaterials: o = !1,
    disposeTextures: a = !1
  } = t, s = e.getMeshByName(r);
  if (s) {
    if (s.dispose(!n, !1), o) {
      const i = s.material;
      if (!i)
        return;
      i.name = `DISPOSED-${i.name}`, i?.dispose(!0, a), e.removeMaterial(i);
    }
    e.removeMesh(s);
  }
}, kt = (e) => {
  if (!N(e))
    return e.sort((r, t) => r.distance - t.distance), e[0];
}, Ot = (e, r, t = {}) => P(e, r, () => {
  const { arc: n = 1, height: o = 1, radius: a = 0.5, tag: s } = t, i = v.CreateCylinder(
    r,
    {
      height: o,
      arc: n,
      diameter: a * 2
    },
    e
  );
  return R(e, i, t), i;
}), Ft = (e, r, t) => {
  const { updatable: n = !1 } = t;
  return P(
    e,
    r,
    (o) => Dt(e, r, {
      ...t,
      instance: o
      // updatable: undefined,
    }),
    n
  );
}, Dt = (e, r, t) => {
  const {
    colors: n = [],
    points: o = [],
    color: a = "white",
    updatable: s = !1,
    useVertexAlpha: i,
    instance: l
  } = t, c = o.map((d, f) => n[f] ?? a).map((d) => Y(d)), p = o.map((d) => y(d)), g = v.CreateLines(r, {
    points: p,
    colors: c,
    updatable: s,
    useVertexAlpha: i,
    instance: l
  });
  return R(e, g, t), g;
}, ne = (e, r, t) => {
  const n = e.getMeshByName(r);
  return w(n) ? Promise.resolve(n) : t();
}, Ht = (e, r, t, n) => P(e, r, () => {
  const o = P(e, t, n);
  return _.assertValue(o, () => (console.log({ scene: e, name: r, rootName: t, producer: n }), "Unable to create mesh instance. Missing root mesh.")), o.createInstance(r);
}), Ut = async (e, r, t, n) => ne(e, r, async () => {
  const o = await ne(e, t, n);
  return _.assertValue(o, () => (console.log({ scene: e, name: r, rootName: t, producer: n }), "Unable to create mesh instance. Missing root mesh.")), o.createInstance(r);
}), $t = (e, r, t = {}) => P(e, r, () => {
  const { width: n = 1, height: o = 1, tag: a, doubleSided: s } = t, i = v.CreatePlane(
    r,
    {
      width: n,
      height: o,
      sideOrientation: s ? A.DOUBLESIDE : void 0
    },
    e
  ), { billboard: l } = t;
  return l && (i.billboardMode = A.BILLBOARDMODE_ALL), R(e, i, t), i;
}), Gt = (e, r, t = {}) => P(e, r, () => {
  const { radius: n = 0.5 } = t, o = v.CreateTorusKnot(r, { radius: n }, e);
  return R(e, o, t), o;
}), Wt = (e) => {
  const { XYZI: r, SIZE: t } = e, n = t.z, o = 1 / n / 2, a = 1 / n / 2, s = 1 / n / 2;
  return r.map((i) => {
    const [l, c, p] = k(i), g = (l - t.x / 2) / n + o, d = (c - t.y / 2) / n + a, f = (p - t.z / 2) / -n - s;
    return gt(ft(g, d, f), i.i);
  });
}, _e = (e, r, t) => {
  const { XYZI: n, RGBA: o, SIZE: a } = r, s = o.map((g) => {
    const { r: d, g: f, b: u, a: h } = g;
    return E.builder({ color: [d, f, u, h], model: "rgba" }).toString();
  }), i = new se(t, e), l = 1 / a.z, c = v.CreateBox("temp-box", {
    width: l,
    height: l,
    depth: l
  });
  i.addShape(c, n.length), i.buildMesh(), c.dispose(), Wt(r).forEach((g, d) => {
    const [f, u] = g, h = i.particles[d];
    h.position = y(f);
    const m = s[u];
    h.color = Y(m);
  });
  const p = G(e, "vox-material", "standard");
  return p.specularColor = S("black"), i.mesh.material = p, i.setParticles(), i;
}, Vt = (e, r, t, n = {}) => {
  const o = e.metadata ?? {}, { voxes: a = {} } = o, s = a[t];
  if (N(s))
    throw console.log({ scene: e, name: r, src: t }), new Error(`No voxData found for ${t} ${r}`);
  const i = _e(e, s, r), l = i.mesh;
  return R(e, l, n), i;
}, zt = (e) => e instanceof nt, Xt = (e, r) => {
  const [t, n] = Me(V.normalize2(V.subtract2(r, e)));
  return Math.atan2(n, t) + Math.PI / 2;
}, ke = (e, r = {}) => {
  const {
    disposeSource: t = !1,
    allow32BitsIndices: n = !0,
    meshSubclass: o = void 0,
    subdivideWithSubMeshes: a = !1,
    multiMultiMaterials: s = !1
  } = r;
  return A.MergeMeshes(
    e,
    t,
    n,
    o,
    a,
    s
  );
}, Zt = (e, r, t, n = {}) => {
  const {
    predicate: o = (s) => s.isPickable,
    camera: a = e.activeCamera
  } = n;
  if (!a)
    throw new Error("Camera required");
  return e.multiPick(r, t, o, a);
}, Oe = (e, r = /.*/, t = 0) => {
  const n = "".padStart(t * 2);
  if (r.test(e.name)) {
    console.log(`${n}mesh: '${e.name}'`);
    const o = e.material;
    w(o) && Object.entries(o).filter(
      (s) => /.Texture$/.test(s[0])
    ).map((s) => {
      const [i, l] = s;
      l instanceof B && i !== "_environmentBRDFTexture" && console.log(`${n}tex: '${l.name}' (${i})`);
    });
  }
  e.getChildMeshes().map((o) => Oe(o, r, t + 1));
}, K = {
  lookAt: Xt,
  getBox: Be,
  describeMesh: Oe,
  getPlane: $t,
  getBoxInstance: Ne,
  getSphere: Rt,
  getCylinder: Ot,
  getTorusKnot: Gt,
  getLine: Ft,
  walkMeshes: re,
  pickMesh: At,
  getMesh: P,
  getMeshAsync: ne,
  calcTopOfMeshWorldPosition: It,
  mergeMeshes: ke,
  getVoxModel: Vt,
  calcClientRectForMesh: Nt,
  updateArcRotateCameraPosition: Re,
  findClosestPick: kt,
  destroyMesh: _t,
  getMeshInstance: Ht,
  getMeshInstanceAsync: Ut,
  isInstancedMesh: zt,
  pickMeshes: Zt,
  getPolyhedron: Bt,
  updateMesh: R
}, Yt = (e) => new F(e), Kt = (e) => (r) => {
};
async function Jt(e, r = e.name) {
  return await e();
}
const ue = (e) => {
  const r = Kt();
  return new Promise((t, n) => {
    try {
      e.onAfterRenderCameraObservable.addOnce(() => {
        r(), t();
      }), e.render(!0);
    } catch (o) {
      n(o);
    }
  });
}, Qt = (e) => {
  e.debugLayer.isVisible() ? e.debugLayer.hide() : e.debugLayer.show();
}, Fe = {
  createScene: Yt,
  toggleInspector: Qt,
  renderOnce: ue
}, de = (e) => {
  const r = e.createDefaultEnvironment();
  if (!r)
    throw new Error("Failed to create default environment");
  return r;
}, he = async (e, r = {}) => e.createDefaultXRExperienceAsync(r), De = async (e = H()) => {
  const r = Fe.createScene(e), t = X.getFreeCamera(r, "camera1", {
    position: [0, 5, -10],
    target: [0, 0, 0]
  }), n = e.getRenderingCanvas();
  t.attachControl(n, !0), Z.getHemisphericLight(r, "light1", {
    direction: [0, 1, 0],
    intensity: 0.7
  }), K.getSphere(r, "sphere", {
    radius: 1,
    position: [0, 1, 0]
  });
  const o = de(r);
  if (!o?.ground)
    throw new Error("Failed to create default environment");
  const a = he(r, {
    floorMeshes: [o.ground]
  });
  return e.runRenderLoop(() => {
    r.render();
  }), { scene: r, xr: a };
}, qt = (e = H()) => {
  const r = new F(e), t = e.getRenderingCanvas();
  X.getArcRotateCamera(r, "Camera", {}).attachControl(t, !0), Z.getHemisphericLight(r, "light1", {
    direction: [1, 1, 1]
  }), K.getSphere(r, "sphere", {
    radius: 0.5
  });
  const o = { debug: !1 };
  return t.onkeyup = (a) => {
    a.ctrlKey && a.keyCode === 73 && (o.debug = !o.debug, o.debug ? r.debugLayer.hide() : (console.log("SHOW!"), r.debugLayer.show()));
  }, e.runRenderLoop(() => {
    r.render();
  }), r;
}, jt = {
  createEngine: H,
  createCanvas: Ie,
  v3: y,
  c3: S,
  c4: Y,
  helloWorld: qt,
  helloXrWorld: De,
  attachEditorControls: Ae
}, er = async ({
  canvas: e,
  ...r
}) => {
  const t = new Ee(e, {
    // powerPreference: "high-performance",
    ...r
  });
  return t.hideLoadingUI(), await t.initAsync(), t;
}, tr = () => Ee.IsSupportedAsync, on = {
  createWebGlEngine: H,
  createWebGpuEngine: er,
  isWebGpuCapable: tr
}, rr = (e) => {
  console.log("fixing eyelashes", e.meshes), e.meshes.forEach((r) => {
    if (r.name.includes("Eyelashes") && (console.log("fixing eyelashes", r.name), r.name.includes("primitive1"))) {
      console.log("fixing eyelashes: primitive1", r.name);
      const t = r.material;
      if (!t)
        throw new Error("Mesh has no material", { cause: r });
      const n = t.getActiveTextures()[0];
      n.hasAlpha = !0, n.getAlphaFromRGB = !0, t.transparencyMode = 1, t.opacityTexture = n, r.visibility = 0.5, t.albedoColor = new Se(0, 0, 0);
    }
  });
}, nr = [
  // "Irises",
  // "Pupils",
  // "Sclera", // 'red' of the eye
  // "Cornea",
  // "Eyelashes",
  // "EyeMoisture",
  // "EyeSocket",
  // "Face",
  // "Teeth",
  // "Lips",
  // "Mouth",
  // "Ears",
  // "Torso",
], or = [
  "Irises",
  "Pupils",
  "Sclera"
  // "Eyelashes",
  // "EyeSocket",
  // "Face",
  // "Teeth",
  // "Lips",
  // "Mouth",
  // "Ears",
  // "Torso",
], He = (e) => {
  const r = e?.material?.getActiveTextures() ?? [];
  if (w(
    r.find((t) => {
      const n = t?.name;
      return w(nr.find((o) => n.includes(o)));
    })
  ) && (e.visibility = 0), w(
    r.find((t) => {
      const n = t?.name;
      return w(or.find((o) => n.includes(o)));
    })
  )) {
    const t = e.material;
    t.metallic = 1, t.transparencyMode = 2, t.albedoTexture && (t.albedoTexture.hasAlpha = !0), t.clearCoat.isEnabled = !0, t.clearCoat.intensity = 0.2, t.subSurface.isTranslucencyEnabled = !0, t.subSurface.translucencyIntensity = 0.5, t.subSurface.translucencyIntensityTexture = t.albedoTexture, t.opacityTexture = t.albedoTexture;
  }
  if (e.name === "Genesis8Female.Shape_primitive10") {
    const t = e.material;
    t.metallic = 0, e.visibility = 0;
  }
  if (e.name === "Genesis8Female.Shape_primitive12") {
    const t = e.material;
    t.roughness = 0, t.clearCoat.isEnabled = !0, t.clearCoat.intensity = 0.5, t.subSurface.isTranslucencyEnabled = !0, t.subSurface.translucencyIntensity = 0.5, t.subSurface.translucencyIntensityTexture = t.albedoTexture, e.visibility = 0, e.setEnabled(!1);
  }
  if (e.name === "Genesis8Female.Shape_primitive13") {
    const t = e.material;
    t.metallic = 0;
  }
  if (e.name === "Genesis8Female.Shape_primitive14") {
    const t = e.material;
    t.opacityTexture = null, t.metallic = 0, t.useAlphaFromAlbedoTexture = !1, t.albedoTexture && (t.albedoTexture.level = 3);
  }
  if (e.name.endsWith("Eyelashes.Shape_primitive0")) {
    const t = e.material;
    t.roughness = 0.5, t.clearCoat.isEnabled = !0, t.clearCoat.intensity = 0.5, t.subSurface.isTranslucencyEnabled = !0, t.subSurface.translucencyIntensity = 0.5, t.subSurface.translucencyIntensityTexture = t.albedoTexture, e.visibility = 0.2;
  }
  e.getChildMeshes().map(He);
}, ar = (e) => {
  console.log("fixing bump maps", e.meshes), e.meshes.forEach((r) => {
    const t = r.material;
    t && (t.bumpTexture = null);
  });
}, sr = (e) => {
  rr(e), e.meshes.map(He), ar(e);
}, ir = (e) => {
  const { path: r, scene: t, name: n = r instanceof File ? r.name : r } = e;
  return t.getEngine().hideLoadingUI(), new Promise((a, s) => {
    try {
      pe.ShowLoadingScreen = !1, pe.Append(
        "",
        r,
        t,
        (i) => {
          const l = i.getMeshByName("__root__");
          if (!l)
            throw new Error("No root mesh found", { cause: i });
          l.name = n, i.cameras.length > 0 && (i.activeCamera = i.cameras[0]), i.animationGroups.forEach((c) => {
            c.stop();
          }), sr(i), a(l);
        },
        (i) => {
        },
        (i, l, c) => {
          console.log({ path: r, scene: i, message: l, reason: c }), s(c);
        }
      );
    } catch (i) {
      s(i);
    }
  });
}, an = {
  renderOnce: ue,
  loadDazFigure: ir
  // fixDazFigure,
  // loadAssetContainer,
  // builder,
}, Ue = (e, r = e.width, t = e.height) => {
  const n = document.createElement("canvas");
  return n.width = r, n.height = t, n.getContext("2d").drawImage(
    e,
    0,
    0,
    e.width,
    e.height,
    0,
    0,
    n.width,
    n.height
  ), n;
}, cr = async (e) => {
  if (typeof e == "string")
    return e;
  const r = document.createElement("canvas");
  return r.width = e.width, r.height = e.height, r.getContext("2d").drawImage(e, 0, 0), await yt.toSrcString(r);
}, $e = async (e, r, t) => {
  if (t instanceof HTMLCanvasElement)
    return new Promise((o, a) => {
      try {
        const s = new ie(r, t, e);
        s.update(), s.hasAlpha = !0, o(s);
      } catch (s) {
        a(s);
      }
    });
  const n = await cr(t);
  return new Promise((o, a) => {
    try {
      const s = new B(n, e, !1, !0);
      s.name = r, s.hasAlpha = !0, s.onLoadObservable.addOnce(() => {
        o(s);
      });
    } catch (s) {
      a(s);
    }
  });
}, lr = async (e, r) => {
  const t = ve.randomUuid(), { size: n, image: o, color: a } = e, s = v.CreatePlane(
    `plane-${t}`,
    {
      width: n,
      height: n
    },
    r
  ), i = new D(`material-${t}`, r);
  if (w(o)) {
    const l = await $e(r, `layer-${t}`, o);
    e._texture = l, e._mesh = s, e._material = i, l.hasAlpha = !0, i.opacityTexture = l, i.emissiveTexture = l;
  }
  return w(a) && (i.emissiveColor = S(a)), s.material = i, s;
}, ur = async (e, r) => {
  const t = new F(r);
  return await Promise.all(
    e.map(async (n, o) => {
      const a = await lr(n, t);
      return a.position.set(0, 0, -o), a;
    })
  ), t;
}, dr = ({ size: e } = { size: 4096 }) => {
  const r = H({ width: e, height: e }), t = r.getRenderingCanvas(), n = {
    layers: []
  }, o = {
    addLayer: (a) => (n.layers.push({ size: e, ...a }), o),
    render: async () => Jt(async () => {
      const a = await ur(n.layers, r), s = new oe("camera1", y(0, 0, -1e3), a);
      if (s.setTarget(y()), s.rotation = y(0, 0, Math.PI), s.mode = O.ORTHOGRAPHIC_CAMERA, s.minZ = 0, s.maxZ = 1e5, await ue(a), o.clear(), !t)
        throw new Error("No canvas found", { cause: r });
      return Ue(t);
    }, "Texture render"),
    clear: () => (n.layers.forEach((a) => {
      a?._cached || (a?._texture?.dispose(), a?._mesh?.dispose(), a?._material?.dispose());
    }), n.layers.length = 0, o)
  };
  return o;
}, ge = (e, r) => {
  const t = e.getSize(), n = e.getContext();
  r(n, t), e.update();
}, hr = (e) => {
  ge(e, (r, t) => {
    const { width: n, height: o } = t;
    r.clearRect(0, 0, n, o);
  });
}, gr = (e, r = "DEBUG IMAGE") => {
  const t = Ve.copyToCanvas(e, 1024, 1024);
  t.style.border = "1px solid grey";
  const n = document.createElement("div");
  return n.textContent = r, document.body.appendChild(n), document.body.appendChild(t), new Promise((o, a) => {
    const s = () => {
      t.remove(), n.remove(), o(void 0);
    };
    t.onclick = s, n.onclick = s;
  });
}, fr = (e, r) => {
  const t = e.getTextureByName(r);
  t && (t.dispose(), e.removeTexture(t));
}, pr = (e, r = {}) => {
  const { color: t = "black" } = r;
  ge(e, (n, o) => {
    const { width: a, height: s } = o;
    n.fillStyle = E.from(t).toString(), n.fillRect(0, 0, a, s);
  });
}, mr = (e, r, t = {}) => {
  const {
    backgroundColor: n,
    outline: o = !0,
    color: a = "black",
    fontFamily: s = "monospace",
    fontStyle: i = "bold",
    outlineColor: l = E.builder({ color: "white" }).alpha(0.1).toString(),
    textureSize: c = Math.min(e.getSize().width, e.getSize().height)
  } = t;
  e.hasAlpha = !0;
  let p = c, g = `${i} ${p}px ${s}`;
  const d = e.getContext();
  d.font = g;
  let f = d.measureText(r);
  p = c / f.width * c, g = `${i} ${p}px ${s}`, d.font = g;
  const u = 0;
  f = d.measureText(r);
  const h = f.fontBoundingBoxAscent ?? 0, m = c - (c - h) / 2;
  d.lineWidth = p / 2;
  const M = {
    x: 0,
    y: m - p,
    width: c,
    height: h * 2
  };
  if (w(n)) {
    d.fillStyle = E.from(n).toString();
    const { x: C, y: I, width: q, height: fe } = M;
    d.fillRect(C, I, q, fe);
  }
  return o && (d.strokeStyle = l, d.strokeText(r, u, m)), d.fillStyle = a, d.fillText(r, u, m), e.hasAlpha = !0, e.update(), M;
}, Ge = {
  linearNearest: B.LINEAR_NEAREST,
  nearestNearest: B.NEAREST_NEAREST,
  linearLinear: B.LINEAR_LINEAR,
  nearestLinear: B.NEAREST_LINEAR
}, J = (e, r, t) => {
  const n = e.getTextureByName(r);
  return w(n) ? n : t();
}, Q = (e, r) => {
  const { hasAlpha: t } = r;
  x(t, (n) => {
    e.hasAlpha = n;
  }), e instanceof ie && e.update();
}, yr = (e, r, t = {}) => {
  const n = J(e, r, () => {
    const {
      generateMipMaps: o = !0,
      samplingMode: a = "linearNearest",
      width: s = 1024,
      height: i = 1024,
      init: l
    } = t, c = new ie(
      r,
      {
        width: s,
        height: i
      },
      e,
      o,
      Ge[a]
    );
    return l && (l(c.getContext()), c.update()), c;
  });
  return Q(n, t), n;
}, We = (e) => Ge[e], wr = (e, r, t) => J(e, r, () => {
  const {
    element: n,
    generateMipMaps: o = !0,
    samplingMode: a = "linearNearest"
  } = t;
  if (!n)
    throw new Error("HTML element is required to create texture", {
      cause: t
    });
  const s = new ot(r, n, {
    generateMipMaps: o,
    samplingMode: We(a),
    engine: e.getEngine(),
    scene: e
  });
  return Q(s, t), s;
}), xr = (e, r, t) => {
  const n = J(e, r, () => {
    const {
      src: o,
      generateMipMaps: a = !0,
      samplingMode: s = "linearNearest"
    } = t;
    if (!o)
      throw new Error("src is required", { cause: t });
    const i = new B(o, e, {
      samplingMode: We(s)
    });
    return i.name = r, i;
  });
  return Q(n, t), n;
}, Ve = {
  builder: dr,
  copyToCanvas: Ue,
  debugImage: gr,
  getTexture: J,
  getHtmlElementTexture: wr,
  getDynamicTexture: yr,
  getPathTexture: xr,
  updateTexture: Q,
  imageToTexture: $e,
  drawTextOnTexture: mr,
  drawOnTexture: ge,
  drawBackgroundOnTexture: pr,
  clearTexture: hr,
  destroyTexture: fr
}, Mr = (e, r, t) => {
  const n = e?.effectLayers?.length ? e.getGlowLayerByName(r) : void 0;
  return w(n) ? n : new Pe(r, e, t);
}, br = (e, r, t) => {
  const n = e.getHighlightLayerByName(r);
  return w(n) ? n : new at(r, e, t);
}, sn = {
  getGlowLayer: Mr,
  getHighlightLayer: br
}, ze = {
  getMaterial: G,
  updateMaterial: te,
  updateStandardMaterial: Le
}, Cr = (e, r) => {
  const t = e.getTransformNodeByName(r);
  return w(t) ? t : new st(r, e);
}, cn = {
  getTransformNode: Cr
}, Tr = (e) => {
  const r = e.metadata ?? {}, t = r.solidParticleSystems ?? {};
  return w(t) || (e.metadata = {
    ...r,
    solidParticleSystems: {}
  }), t;
}, Xe = (e, r, t) => {
  const n = Tr(e), o = n[r];
  w(o);
  const a = t();
  return n[r] = a, a;
}, Sr = (e, r, t) => Xe(e, r, () => new se(r, e, {
  ...t
})), Er = (e, r, t = {}) => {
  const n = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), a = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), { material: l, onMeshBuild: c, ...p } = t;
  let g;
  const d = () => {
    g?.mesh?.dispose(!1), g = new se(r, e, {
      ...p
    });
  };
  d();
  const f = {
    scene: e,
    clearParticles: () => {
      g.particles.forEach((u, h) => {
        u.color = xe;
      }), g.setParticles(), g.particles.forEach((u, h) => {
        u.alive = !1;
      });
    },
    getSystem: () => g,
    getNames: () => s.keys(),
    hasMesh: (u) => s.has(u),
    getInstance: () => g,
    updateNextParticle: (u, h) => {
      const m = _.assertValue(
        s.get(u)
      ), M = _.assertValue(n.get(u)), C = m[M];
      f.updateParticleByIndex(C, h), n.set(u, M + 1);
    },
    updateParticleByIndex: (u, h) => {
      const m = g.particles[u];
      _.assertValue(m, `particle not found for ${u}`), m.alive = !0, h(m, u);
    },
    updateParticlesByName: (u, h) => {
      const m = s.get(u);
      m && m.forEach((M) => {
        f.updateParticleByIndex(M, h);
      });
    },
    removeMesh: (u) => {
      o.delete(u), a.delete(u), s.delete(u.name), i.delete(u.name), f.rebuild();
    },
    addMesh: (u, h = 1) => {
      if (o.has(u))
        throw new Error(
          `Mesh ${u.name} already exists in the Sps. Use removeMesh to remove it first.`
        );
      n.set(u.name, 0), o.set(u, h), i.set(u.name, u), f.rebuild(), f.clearParticles(), u.setEnabled(!1);
    },
    rebuild: () => {
      d(), a.clear();
      try {
        o.forEach((h, m) => {
          g.addShape(m, h);
          for (let M = 0; M < h; M++) {
            const C = g.particles.length - 1 - M;
            a.set(m, [
              ...a.get(m) || [],
              C
            ]), s.set(m.name, [
              ...a.get(m) || [],
              C
            ]);
          }
        });
        const u = g.buildMesh();
        l && (u.material = ze.getMaterial(e, l)), c?.(u);
      } catch (u) {
        console.error(u);
      }
    },
    syncParticlestoMeshes: () => {
      a.forEach((u, h) => {
        for (let m = 0; m < u.length; m++) {
          const M = u[m], C = _.assertValue(g.particles[M]);
          if (C.position.copyFrom(h.position), C.rotation.copyFrom(h.rotation), C.scaling.copyFrom(h.scaling), h.material instanceof D) {
            const I = h.material.diffuseColor;
            C.color = new z(I.r, I.g, I.b, h.material.alpha);
          }
        }
      });
    },
    dispose: () => {
      o.clear(), a.clear(), s.clear(), i.clear(), n.clear(), g?.mesh?.dispose(), g.dispose();
    },
    update: () => {
      g.setParticles(), n.forEach((u, h) => {
        n.set(h, 0);
      }), g.particles.forEach((u) => {
        u.alive = !1, u.color = xe;
      });
    }
  };
  return f;
}, xe = new z(0, 0, 0, 0), Pr = {
  getSolidParticleSystem: Sr,
  getParticleSystem: Xe,
  Sps: Er
}, vr = (e, r, t) => new it(y(e), y(r), t), Rr = (e, r, t = {}) => {
  const {
    trianglePredicate: n,
    fastCheck: o,
    predicate: a = (s) => s.isPickable
  } = t;
  return e.pickWithRay(r, a, o, n);
}, ln = {
  createRay: vr,
  pickWithRay: Rr
}, Ar = (e) => {
  const r = e.getScene();
  e.dispose(), r.getLightsByTags("shadowCaster").forEach((n) => {
    n.metadata.shadowGenerator.removeShadowCaster(e);
  });
}, Ir = (e) => (e.getScene().getLightsByTags("shadowCaster").forEach((n) => {
  n.metadata.shadowGenerator.addShadowCaster(e);
}), () => {
  Ar(e);
}), un = {
  addShadowToMesh: Ir
}, Lr = (e, r, t = {}) => {
  const n = new Pe(r, e, t);
  return n.neutralColor = new z(0, 0, 0, 0), n;
}, dn = {
  addGlowLayer: Lr,
  Constants: ct
};
async function Br({
  baseUrl: e,
  imageNames: r,
  atlasSize: t,
  padding: n = 0
}) {
  const o = document.createElement("canvas");
  o.width = t, o.height = t;
  const a = o.getContext("2d"), s = {}, i = [];
  let l = 0, c = 0, p = 0;
  for (const d of r) {
    const f = d.endsWith(".png") ? d : `${d}.png`, u = await Nr(`${e}/${f}`), h = u.width + n * 2, m = u.height + n * 2;
    if (l + h > t && (l = 0, c += p, p = 0), c + m > t)
      throw new Error(`Not enough space in atlas for image: ${f}`);
    a.drawImage(u, l + n, c + n), s[f] = {
      frame: {
        x: l + n,
        y: c + n,
        w: u.width,
        h: u.height
      }
    }, i.push({
      filename: f,
      frame: {
        x: l + n,
        y: c + n,
        w: u.width,
        h: u.height
      },
      rotated: !1,
      trimmed: !1,
      spriteSourceSize: { x: 0, y: 0, w: u.width, h: u.height },
      sourceSize: { w: u.width, h: u.height }
    }), l += h, p = Math.max(p, m);
  }
  const g = await new Promise(
    (d) => o.toBlob((f) => d(f), "image/png")
  );
  return {
    canvas: o,
    atlasBlob: g,
    spritePackageManagerJson: { frames: s },
    babylonSpriteMapJson: { frames: i }
  };
}
async function Nr(e) {
  return new Promise((r, t) => {
    const n = new Image();
    n.src = e, n.onload = () => r(n), n.onerror = (o) => t(new Error(`Failed to load image: ${e}`));
  });
}
const _r = (e, r, t = {}) => {
  const n = e?.spriteManagers?.find((d) => d.name === r);
  if (w(n))
    return n;
  const {
    capacity: o = 1,
    atlasUrl: a,
    atlasBlob: s,
    epsilon: i,
    samplingMode: l,
    spriteJSON: c,
    options: p
  } = t;
  let g;
  try {
    s && (g = URL.createObjectURL(s));
    const d = w(a) ? a : g;
    if (N(d))
      throw new Error("altasUrl or atlasBlob is required", { cause: t });
    return new lt(
      r,
      d,
      o,
      e,
      c,
      i,
      l,
      p
    );
  } finally {
    g && URL.revokeObjectURL(g);
  }
}, Ze = (e, r, t = {}) => {
  const n = e?.spriteManagers?.find((u) => u.name === r);
  if (w(n))
    return n;
  const {
    capacity: o = 1,
    cellSize: a = 64,
    atlasUrl: s,
    atlasBlob: i,
    epsilon: l,
    samplingMode: c,
    fromPacked: p,
    spriteJSON: g,
    options: d
  } = t;
  let f;
  try {
    i && (f = URL.createObjectURL(i));
    const u = w(s) ? s : f;
    if (N(u))
      throw new Error("altasUrl or atlasBlob is required", { cause: t });
    return new ut(
      r,
      u,
      o,
      a,
      e,
      l,
      c,
      p,
      g,
      d
    );
  } finally {
    f && URL.revokeObjectURL(f);
  }
}, kr = (e, r, t) => {
  const n = mt(Ze(e, t)), o = n?.sprites?.find((a) => a.name === r);
  return w(o) ? o : new dt(r, n);
}, hn = {
  getSpriteManager: Ze,
  getSprite: kr,
  createTextureAtlas: Br,
  getSpritePackedManager: _r
}, Or = (e, r = {}) => {
  const {
    random: t = ve.globalRandom,
    radius: n = 1,
    maxBounce: o = 0,
    groundZ: a = 0,
    speed: s = 20,
    decay: i = 0.01,
    dispose: l = () => e.isVisible = !1
  } = r;
  {
    const c = e.props?.path;
    if (w(c) && c.length > 0) {
      const p = c.pop();
      if (!p)
        throw new Error("No next value from path", { cause: c });
      e.position = p;
      return;
    }
  }
  {
    const { bounces: c = o } = e.props ?? {};
    if (c <= 0) {
      t() < i && l();
      return;
    }
    const p = c / o, g = e.position, [d, f, u] = k(g), h = (Qe) => (t() * n * 2 - n) * (p / 4) + Qe, [m, M] = [h(d), h(f)], C = y([m, M, a]), [I, q, fe] = k(V.midPoint3(g, C)), Ye = y(I, q, u - t() * p * 3), Ke = {
      path: ht.CreateCatmullRomSpline([g, Ye, C], s).getPoints().reverse(),
      bounces: c - 1
      // rotationAxis: [2 * random() - 1, 2 * random() - 1, 2 * random() - 1],
    }, Je = e.props ?? {};
    e.props = { ...Je, ...Ke };
  }
};
class L {
  /**
   * Evaluate a query
   * @param query defines the query to evaluate
   * @param evaluateCallback defines the callback used to filter result
   * @returns true if the query matches
   */
  static Eval(r, t) {
    return r.match(/\([^()]*\)/g) ? r = r.replace(/\([^()]*\)/g, (n) => (n = n.slice(1, n.length - 1), L._HandleParenthesisContent(n, t))) : r = L._HandleParenthesisContent(r, t), r === "true" ? !0 : r === "false" ? !1 : L.Eval(r, t);
  }
  static _HandleParenthesisContent(r, t) {
    t = t || ((a) => a === "true");
    let n;
    const o = r.split("||");
    for (const a in o)
      if (Object.prototype.hasOwnProperty.call(o, a)) {
        let s = L._SimplifyNegation(o[a].trim());
        const i = s.split("&&");
        if (i.length > 1)
          for (let l = 0; l < i.length; ++l) {
            const c = L._SimplifyNegation(i[l].trim());
            if (c !== "true" && c !== "false" ? c[0] === "!" ? n = !t(c.substring(1)) : n = t(c) : n = c === "true", !n) {
              s = "false";
              break;
            }
          }
        if (n || s === "true") {
          n = !0;
          break;
        }
        s !== "true" && s !== "false" ? s[0] === "!" ? n = !t(s.substring(1)) : n = t(s) : n = s === "true";
      }
    return n ? "true" : "false";
  }
  static _SimplifyNegation(r) {
    return r = r.replace(/^[\s!]+/, (t) => (t = t.replace(/[\s]/g, () => ""), t.length % 2 ? "!" : "")), r = r.trim(), r === "!true" ? r = "false" : r === "!false" && (r = "true"), r;
  }
}
class T {
  /**
   * Adds support for tags on the given object
   * @param obj defines the object to use
   */
  static EnableFor(r) {
    r._tags = r._tags || {}, r.hasTags = () => T.HasTags(r), r.addTags = (t) => T.AddTagsTo(r, t), r.removeTags = (t) => T.RemoveTagsFrom(r, t), r.matchesTagsQuery = (t) => T.MatchesQuery(r, t);
  }
  /**
   * Removes tags support
   * @param obj defines the object to use
   */
  static DisableFor(r) {
    delete r._tags, delete r.hasTags, delete r.addTags, delete r.removeTags, delete r.matchesTagsQuery;
  }
  /**
   * Gets a boolean indicating if the given object has tags
   * @param obj defines the object to use
   * @returns a boolean
   */
  static HasTags(r) {
    if (!r._tags)
      return !1;
    const t = r._tags;
    for (const n in t)
      if (Object.prototype.hasOwnProperty.call(t, n))
        return !0;
    return !1;
  }
  /**
   * Gets the tags available on a given object
   * @param obj defines the object to use
   * @param asString defines if the tags must be returned as a string instead of an array of strings
   * @returns the tags
   */
  static GetTags(r, t = !0) {
    if (!r._tags)
      return null;
    if (t) {
      const n = [];
      for (const o in r._tags)
        Object.prototype.hasOwnProperty.call(r._tags, o) && r._tags[o] === !0 && n.push(o);
      return n.join(" ");
    } else
      return r._tags;
  }
  /**
   * Adds tags to an object
   * @param obj defines the object to use
   * @param tagsString defines the tag string. The tags 'true' and 'false' are reserved and cannot be used as tags.
   * A tag cannot start with '||', '&&', and '!'. It cannot contain whitespaces
   */
  static AddTagsTo(r, t) {
    if (!t || typeof t != "string")
      return;
    const n = t.split(" ");
    for (const o of n)
      T._AddTagTo(r, o);
  }
  /**
   * @internal
   */
  static _AddTagTo(r, t) {
    t = t.trim(), !(t === "" || t === "true" || t === "false") && (t.match(/[\s]/) || t.match(/^([!]|([|]|[&]){2})/) || (T.EnableFor(r), r._tags[t] = !0));
  }
  /**
   * Removes specific tags from a specific object
   * @param obj defines the object to use
   * @param tagsString defines the tags to remove
   */
  static RemoveTagsFrom(r, t) {
    if (!T.HasTags(r))
      return;
    const n = t.split(" ");
    for (const o in n)
      T._RemoveTagFrom(r, n[o]);
  }
  /**
   * @internal
   */
  static _RemoveTagFrom(r, t) {
    delete r._tags[t];
  }
  /**
   * Defines if tags hosted on an object match a given query
   * @param obj defines the object to use
   * @param tagsQuery defines the tag query
   * @returns a boolean
   */
  static MatchesQuery(r, t) {
    return t === void 0 ? !0 : t === "" ? T.HasTags(r) : L.Eval(t, (n) => T.HasTags(r) && r._tags[n]);
  }
}
const Fr = (e, r, t) => {
  const { XYZI: n, RGBA: o } = r, a = o.map((i) => {
    const { r: l, g: c, b: p, a: g } = i;
    return E.builder({ color: [l, c, p, g], model: "rgba" }).toString();
  }), s = new A(t, e);
  return n.map((i, l) => {
    const c = a[i.i], p = Ne(e, `voxel-${c}`, {
      color: c,
      material: `voxel-material-${c}`
    });
    return p.position = y(i), p.parent = s, p;
  }), T.AddTagsTo(s, "complex"), s;
}, Dr = (e) => {
  const r = Object.entries(e).sort((t, n) => {
    const [o] = t, [a] = n;
    return o.localeCompare(a);
  });
  return JSON.stringify(r);
}, Hr = (e) => {
  const r = {};
  return e.forEach((t) => {
    const n = t?.material?.name;
    if (!n)
      throw new Error("Mesh material is missing name", { cause: t });
    const o = r[n] ?? [];
    o.push(t), r[n] = o;
  }), r;
}, Ur = (e, r, t) => {
  const { XYZI: n, RGBA: o } = r, a = o.map((d) => {
    const { r: f, g: u, b: h, a: m } = d;
    return E.builder({ color: [f, u, h, m], model: "rgba" }).toString();
  }), s = n.map((d, f) => {
    const u = a[d.i], [h, m, M] = k(d), C = Be(
      e,
      `voxel-merged-${u}-${Dr(d)}`,
      {
        position: [h, m, M],
        // color,
        // material: `voxel-merged-material-${color}`,
        material: "voxel-material",
        colors: pt.from(6).map(() => u)
      }
    );
    return C.setEnabled(!1), C;
  }), i = Hr(s), l = Object.values(i).map((d) => ke(d)), c = new A(`merged-${t}`, e);
  l.filter(w).forEach((d) => d.parent = c);
  const p = G(e, "voxel-material", "standard");
  l.filter(w).forEach((d) => d.material = p), c.metadata = {
    voxels: s
  }, T.AddTagsTo(c, "merged");
  const g = new A(t, e);
  return g.metadata = {
    voxels: s
  }, c.parent = g, g;
}, gn = {
  animateExplosion: Or,
  voxDataToSps: _e,
  voxDataToMergedModel: Ur,
  voxDataToComplexModel: Fr
}, $r = (e) => new b.WebXRSessionManager(e), Gr = (e) => {
  const r = Fe.createScene(e), t = X.getFreeCamera(r, "camera1", {
    position: [0, 5, -10],
    target: [0, 0, 0]
  }), n = e.getRenderingCanvas();
  t.attachControl(n, !0), Z.getHemisphericLight(r, "light1", {
    direction: [0, 1, 0],
    intensity: 0.7
  }), K.getSphere(r, "sphere", {
    radius: 1,
    position: [0, 1, 0]
  });
  const o = de(r);
  if (!o?.ground)
    throw new Error("Failed to create default environment");
  const a = he(r, {
    floorMeshes: [o.ground]
  });
  return e.runRenderLoop(() => {
    r.render();
  }), { scene: r, xr: a };
}, fn = {
  createWebXrSessionManager: $r,
  helloXrWorld: De,
  createDefaultEnvironment: de,
  createWebXrExperience: he,
  wtf: Gr
}, Wr = ({
  engine: e,
  canvas: r
}) => {
  const t = new b.Scene(e);
  console.log(t), new b.ArcRotateCamera(
    "ArcRotateCamera",
    -Math.PI / 2,
    Math.PI / 2.2,
    50,
    new b.Vector3(0, 0, 0),
    t
  ).attachControl(r, !0), new b.HemisphericLight(
    "light",
    new b.Vector3(0, 1, -1),
    t
  );
  const o = new b.StandardMaterial("mat");
  o.diffuseTexture = new b.Texture("textures/earth.jpg");
  const a = new b.StandardMaterial("mat"), s = new b.Texture("textures/fire.jpg");
  a.diffuseTexture = s;
  const i = new b.SolidParticleSystem("SPS", t, {
    useModelMaterial: !0
  }), l = b.MeshBuilder.CreateBox("FOO");
  return l.material = o, i.addShape(l, 1e4), i.buildMesh(), i.initParticles = () => {
    for (let p = 0; p < i.nbParticles; p++) {
      const g = i.particles[p];
      g.position.x = b.Scalar.RandomRange(-20, 20), g.position.y = b.Scalar.RandomRange(-20, 20), g.position.z = b.Scalar.RandomRange(-20, 20);
    }
  }, i.initParticles(), i.setParticles(), { scene: t, update: () => {
    const p = Math.sin(Date.now() * 5e-3);
    i.particles.forEach((g, d) => {
      d > 20 ? (g.rotation.x = p, o.alpha = p, o.diffuseTexture = s) : g.rotation.y = p;
    }), i.setParticles();
  } };
}, Vr = ({
  engine: e,
  canvas: r
}) => {
  const t = new b.Scene(e);
  console.log(t), X.getArcRotateCamera(t, "ArcRotateCamera", {
    alpha: -Math.PI / 2,
    beta: Math.PI / 2.2,
    radius: 50,
    target: [0, 0, 0]
  }).attachControl(r, !0), Z.getHemisphericLight(t, "light", {
    direction: [0, 1, -1]
  });
  const o = Ve.getPathTexture(t, "tex", {
    src: "/images/test.jpg"
  }), a = ze.getMaterial(t, "mat", {
    opacityTexture: o.name
    // diffuseColor: Colors.from("red").alpha(0.99).toString(),
    // alpha: 0.99,
  }), s = K.getBox(
    t,
    "box1"
    //  { material: mat.name }
  ), i = Pr.Sps(t, "sps", {
    material: a.name,
    updatable: !0,
    // enableDepthSort: true,
    onMeshBuild: (c) => {
      c.useVertexColors = !0, c.hasVertexAlpha = !0;
    }
  });
  return i.addMesh(s, 1e4), i.updateParticlesByName("box1", (c, p) => {
    c.position.x = b.Scalar.RandomRange(-20, 20), c.position.y = b.Scalar.RandomRange(-20, 20), c.position.z = b.Scalar.RandomRange(-20, 20);
  }), { scene: t, update: () => {
    const c = Math.sin(Date.now() * 5e-3), p = wt.noiseStream(0);
    i.updateParticlesByName("box1", (g, d) => {
      g.color = new b.Color4(p(), p(), p(), 0.5), Math.random() > 0.5 ? g.rotation.x = p() * c : g.rotation.y = p() * c;
    }), i.update();
  } };
}, pn = {
  spsDebug: Wr,
  spsDebug2: Vr
};
export {
  jt as Babs,
  we as CAMERA_MODES,
  X as Cameras,
  pn as Debugs,
  on as Engines,
  sn as Layers,
  Z as Lights,
  ze as Materials,
  K as Meshes,
  an as Models,
  cn as Nodes,
  Pr as Particles,
  ln as Rays,
  Fe as Scenes,
  un as Shadows,
  dn as Specials,
  hn as Sprites,
  Ve as Textures,
  gn as Voxels,
  fn as Wxrs,
  Lr as addGlowLayer
};
//# sourceMappingURL=index.js.map
