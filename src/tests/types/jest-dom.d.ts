import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveClass(className: string): R;
      toHaveAttribute(attr: string, value?: string): R;
      toBeDisabled(): R;
      toBeEnabled(): R;
      toBeChecked(): R;
      toBeVisible(): R;
      toBeRequired(): R;
      toHaveValue(value: string | string[] | number): R;
      toHaveTextContent(text: string | RegExp): R;
      toHaveStyle(style: Record<string, unknown>): R;
      toHaveFocus(): R;
      toContainElement(element: HTMLElement | null): R;
      toContainHTML(html: string): R;
    }
  }
}
