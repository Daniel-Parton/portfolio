export interface RectReadOnly {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
  readonly top: number;
  readonly right: number;
  readonly bottom: number;
  readonly left: number;
}

export type HTMLOrSVGElement = HTMLElement | SVGElement;

export interface UseMeasureState {
  scrollContainers: HTMLOrSVGElement[] | null;
  resizeObserver: ResizeObserver | null;
  lastBounds: RectDataModel;
}

export interface BoundsData {
  hasBounds: boolean;
  bounds: RectDataModel;
}

export class RectDataModel implements RectReadOnly {
  private readonly _raw: RectReadOnly;

  get x() {
    return this._raw.x;
  }

  get y() {
    return this._raw.y;
  }

  get width() {
    return this._raw.width;
  }

  get halfWidth() {
    return this.width / 2;
  }

  get height() {
    return this._raw.height;
  }

  get halfHeight() {
    return this.height / 2;
  }

  get top() {
    return this._raw.top;
  }

  get right() {
    return this._raw.right;
  }

  get bottom() {
    return this._raw.bottom;
  }

  get left() {
    return this._raw.left;
  }

  get largestSide() {
    return this.height > this.width ? this.height : this.width;
  }

  get smallestSide() {
    return this.height < this.width ? this.height : this.width;
  }

  get coordinates(): RectCoordinates {
    return {
      xLeft: this.x,
      xRight: this.x + this.width,
      yTop: this.y,
      yBottom: this.y + this.height
    };
  }

  get boundingClientRect(): RectReadOnly {
    return this._raw;
  }

  constructor(boundingClientRect: RectReadOnly) {
    this._raw = boundingClientRect;
  }

  isEqual(obj: RectReadOnly) {
    return RectDataModel.equalityKeys.every(
      (key) => this._raw[key] === obj[key],
      this
    );
  }

  getOffsetCoordinates(parent: RectReadOnly): RectCoordinates {
    return {
      xLeft: this.x - parent.x,
      xRight: this.x - parent.x + this.width,
      yTop: this.y - parent.y,
      yBottom: this.y - parent.y + this.height
    };
  }

  static empty() {
    return new RectDataModel({
      left: 0,
      top: 0,
      width: 0,
      height: 0,
      bottom: 0,
      right: 0,
      x: 0,
      y: 0
    });
  }

  static fromElement(element?: HTMLOrSVGElement) {
    if (!element?.getBoundingClientRect) {
      return RectDataModel.empty();
    }

    const { left, top, width, height, bottom, right, x, y } =
      element.getBoundingClientRect() as unknown as RectReadOnly;
    return new RectDataModel({
      left,
      top,
      width,
      height,
      bottom,
      right,
      x,
      y
    });
  }

  static equalityKeys: (keyof RectReadOnly)[] = [
    'x',
    'y',
    'top',
    'bottom',
    'left',
    'right',
    'width',
    'height'
  ];
}

export interface RectCoordinates {
  xLeft: number;
  xRight: number;
  yTop: number;
  yBottom: number;
}
