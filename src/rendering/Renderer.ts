import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';

export class Renderer {
  private readonly renderer = new WebGLRenderer({ antialias: true });
  private readonly camera = new PerspectiveCamera(70, 1, 0.1, 1000);

  public constructor(container: HTMLElement) {
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.position.set(4, 4, 6);
    this.camera.lookAt(0, 0.5, 0);

    container.append(this.renderer.domElement);
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  }

  public render(scene: Scene): void {
    this.renderer.render(scene, this.camera);
  }

  public dispose(): void {
    window.removeEventListener('resize', this.handleResize);
    this.renderer.dispose();
  }

  private readonly handleResize = (): void => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  };
}
