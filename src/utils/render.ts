import {RenderPosition} from '../const';
import AbstractView from '../view/abstract';

export const render = (container: HTMLElement | AbstractView, child: ChildNode | AbstractView, place: RenderPosition): void => {
  if (container instanceof AbstractView) {
    container = container.getElement();
  }

  if (child instanceof AbstractView) {
    child = child.getElement();
  }

  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(child);
      break;
    case RenderPosition.BEFOREEND:
      container.append(child);
      break;
  }
};

export const renderTemplate = (container: HTMLElement | AbstractView, template: string, place: RenderPosition): void => {
  if (container instanceof AbstractView) {
    container = container.getElement();
  }

  container.insertAdjacentHTML(place, template);
};

export const createElement = (template: string): HTMLElement => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return <HTMLElement> newElement.firstChild;
};

export const replace = (newChild: HTMLElement | AbstractView, oldChild: HTMLElement | AbstractView): void => {
  if (oldChild instanceof AbstractView) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof AbstractView) {
    newChild = newChild.getElement();
  }

  const parent = oldChild.parentElement;

  if (parent === null || oldChild === null || newChild === null) {
    throw new Error(`Can't replace unexisting elements`);
  }

  parent.replaceChild(newChild, oldChild);
};

export const remove = (component: HTMLElement | AbstractView): void => {
  if (component === null) {
    return;
  }

  if (!(component instanceof AbstractView)) {
    throw new Error(`Can remove only components`);
  }

  component.getElement().remove();
  component.removeElement();
};
