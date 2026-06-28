import {
  AmbientLight,
  BoxGeometry,
  Color,
  DirectionalLight,
  GridHelper,
  Mesh,
  MeshStandardMaterial,
  Scene,
} from 'three';
import { Renderer } from '../rendering/Renderer';

export class Game {
  private readonly renderer: Renderer;
  private readonly scene = new Scene();
  private readonly cube: Mesh;
  private animationFrameId = 0;
  private lastFrameTime = 0;

  public constructor(container: HTMLElement) {
    this.renderer = new Renderer(container);
    this.scene.background = new Color(0x87ceeb);

    this.cube = this.createStarterCube();
    this.scene.add(this.cube);
    this.scene.add(new GridHelper(24, 24, 0x4f772d, 0x31572c));
    this.addLighting();
  }

  public start(): void {
    this.lastFrameTime = performance.now();
    this.animationFrameId = requestAnimationFrame(this.tick);
  }

  public stop(): void {
    cancelAnimationFrame(this.animationFrameId);
    this.renderer.dispose();
  }

  private readonly tick = (currentTime: number): void => {
    const deltaSeconds = (currentTime - this.lastFrameTime) / 1000;
    this.lastFrameTime = currentTime;

    this.update(deltaSeconds);
    this.renderer.render(this.scene);
    this.animationFrameId = requestAnimationFrame(this.tick);
  };

  private update(deltaSeconds: number): void {
    this.cube.rotation.x += deltaSeconds * 0.5;
    this.cube.rotation.y += deltaSeconds * 0.8;
  }

  private createStarterCube(): Mesh {
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshStandardMaterial({ color: 0x7cb342 });
    const cube = new Mesh(geometry, material);
    cube.position.y = 0.5;
    return cube;
  }

  private addLighting(): void {
    const sun = new DirectionalLight(0xffffff, 2.5);
    sun.position.set(4, 8, 5);
    this.scene.add(sun);
    this.scene.add(new AmbientLight(0xffffff, 0.45));
  }
}
