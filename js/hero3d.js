/* Hero 3D: liquid noise blob + particle field (Three.js) */
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

const canvas = document.querySelector('.hero__canvas');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const small = innerWidth < 760;

const NOISE = `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0); const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.0-g; vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx; vec3 x2=x0-i2+C.yyy; vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857; vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z); vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy; vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0; vec4 s1=floor(b1)*2.0+1.0; vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y); vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0); m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

const VERT = NOISE + `
uniform float uTime; uniform float uAmp; uniform vec2 uMouse;
varying vec3 vN; varying vec3 vView; varying float vD; varying vec3 vW;
float disp(vec3 p){
  float n=snoise(p*0.9+vec3(uTime*0.16,uTime*0.11,0.0));
  float n2=snoise(p*1.7-vec3(0.0,uTime*0.2,uTime*0.08))*0.28;
  return (n+n2)*uAmp + dot(normalize(p),vec3(uMouse,0.0))*0.1;
}
vec3 orth(vec3 v){return abs(v.x)>abs(v.z)?vec3(-v.y,v.x,0.0):vec3(0.0,-v.z,v.y);}
void main(){
  vec3 n0=normalize(position);
  float d=disp(position);
  vec3 p=position+n0*d;
  float e=0.01;
  vec3 t=normalize(orth(n0)); vec3 b=normalize(cross(n0,t));
  vec3 pt=position+t*e; vec3 pb=position+b*e;
  pt+=normalize(pt)*disp(pt); pb+=normalize(pb)*disp(pb);
  vec3 nrm=normalize(cross(pt-p,pb-p));
  vD=d;
  vec4 mv=modelViewMatrix*vec4(p,1.0);
  vN=normalize(normalMatrix*nrm); vView=normalize(-mv.xyz); vW=mv.xyz;
  gl_Position=projectionMatrix*mv;
}`;

const FRAG = `
uniform float uTime; varying vec3 vN; varying vec3 vView; varying float vD; varying vec3 vW;
void main(){
  vec3 N=normalize(vN); vec3 V=normalize(vView);
  float f=pow(1.0-max(dot(N,V),0.0),2.4);
  vec3 L1=normalize(vec3(-0.6,0.8,0.7)); vec3 L2=normalize(vec3(0.9,-0.4,0.3));
  float dif=max(dot(N,L1),0.0); float dif2=max(dot(N,L2),0.0);
  float spec=pow(max(dot(reflect(-L1,N),V),0.0),48.0);
  vec3 deep=vec3(0.035,0.032,0.045);
  vec3 ember=vec3(1.0,0.30,0.18); vec3 gold=vec3(1.0,0.70,0.28); vec3 ice=vec3(0.5,0.58,1.0);
  float band=0.5+0.5*sin(vD*7.0+uTime*0.5);
  vec3 rim=mix(ember,gold,band);
  vec3 col=deep*(0.6+dif*1.4);
  col+=gold*dif*0.08+ember*dif2*0.22;
  col+=rim*f*1.25;
  col+=ice*smoothstep(0.8,1.0,f)*0.18;
  col+=vec3(1.0,0.92,0.82)*spec*0.9;
  gl_FragColor=vec4(col,1.0);
}`;

function init() {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: !small, alpha: true, powerPreference: 'high-performance' });
  } catch (e) { canvas.remove(); return; }
  renderer.setPixelRatio(Math.min(devicePixelRatio, small ? 1.5 : 1.75));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0, 7);

  /* Blob */
  const uniforms = { uTime: { value: 0 }, uAmp: { value: 0.24 }, uMouse: { value: new THREE.Vector2() } };
  const blob = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.55, small ? 48 : 96),
    new THREE.ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms })
  );
  const group = new THREE.Group();
  group.add(blob);
  scene.add(group);

  /* Orbit ring */
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(2.45, 0.004, 8, 220),
    new THREE.MeshBasicMaterial({ color: 0xffb23f, transparent: true, opacity: 0.35 })
  );
  ring.rotation.x = Math.PI * 0.42;
  group.add(ring);

  /* Particles */
  const N = small ? 600 : 1400;
  const pos = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    const r = 2.6 + Math.random() * 6;
    const t = Math.random() * Math.PI * 2, p = Math.acos(2 * Math.random() - 1);
    pos[i * 3] = r * Math.sin(p) * Math.cos(t);
    pos[i * 3 + 1] = r * Math.sin(p) * Math.sin(t) * 0.6;
    pos[i * 3 + 2] = r * Math.cos(p) - 2;
  }
  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  const stars = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0xefece6, size: 0.018, transparent: true, opacity: 0.55, sizeAttenuation: true, depthWrite: false }));
  scene.add(stars);

  /* Layout: blob sits right on desktop, centered-top on mobile */
  const resize = () => {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
    const mobile = w < 760;
    group.position.set(mobile ? 0.4 : 1.9, mobile ? 0.9 : 0.15, 0);
    group.scale.setScalar(mobile ? 0.8 : (w < 1100 ? 0.9 : 1));
  };
  resize();
  addEventListener('resize', resize);

  /* Input */
  const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
  addEventListener('pointermove', e => { mouse.tx = (e.clientX / innerWidth) * 2 - 1; mouse.ty = -((e.clientY / innerHeight) * 2 - 1); }, { passive: true });

  let scrollP = 0;
  const readScroll = () => { scrollP = Math.min(scrollY / innerHeight, 1.2); };
  addEventListener('scroll', readScroll, { passive: true });

  /* Intro scale */
  let intro = 0;
  const introStart = () => { intro = 0.0001; };
  addEventListener('fj:intro', introStart);
  setTimeout(() => { if (!intro) intro = 0.0001; }, 3500);

  /* Only render when visible */
  let visible = true;
  new IntersectionObserver(([en]) => { visible = en.isIntersecting; }).observe(canvas);

  const clock = new THREE.Clock();
  const frame = () => {
    requestAnimationFrame(frame);
    if (!visible) return;
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.elapsedTime;
    if (intro > 0 && intro < 1) intro = Math.min(1, intro + dt * 0.7);
    const e = 1 - Math.pow(1 - intro, 4);

    mouse.x += (mouse.tx - mouse.x) * 0.05; mouse.y += (mouse.ty - mouse.y) * 0.05;
    uniforms.uTime.value = t;
    uniforms.uMouse.value.set(mouse.x, mouse.y);
    uniforms.uAmp.value = 0.24 + scrollP * 0.3 + Math.sin(t * 0.5) * 0.03;

    blob.rotation.y = t * 0.12 + mouse.x * 0.5 + scrollP * 1.6;
    blob.rotation.x = mouse.y * 0.35 + scrollP * 0.8;
    ring.rotation.z = t * 0.08;
    ring.rotation.y = mouse.x * 0.3;
    blob.scale.setScalar(0.4 + e * 0.6 + scrollP * 0.25);
    ring.material.opacity = 0.35 * e * (1 - Math.min(scrollP, 1));
    group.position.y += ((innerWidth < 760 ? 0.9 : 0.15) + scrollP * 1.2 - group.position.y) * 0.08;

    stars.rotation.y = t * 0.015 + mouse.x * 0.08;
    stars.rotation.x = mouse.y * 0.05;
    camera.position.x += (mouse.x * 0.35 - camera.position.x) * 0.04;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  };

  if (reduce) {
    intro = 1; uniforms.uTime.value = 4; blob.scale.setScalar(1);
    renderer.render(scene, camera);
    addEventListener('resize', () => renderer.render(scene, camera));
  } else {
    frame();
  }
}

if (canvas) init();
