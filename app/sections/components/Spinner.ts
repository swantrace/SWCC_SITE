import { virtual, html } from "haunted";

const Spinner = virtual(() => {
  return html`
    <div class="d-flex w-100 justify-content-center align-items-center my-5">
      <div
        class="spinner-border text-primary text-center mx-auto my-5"
        style="width: 200px; height: 200px;"
        role="status"
      >
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  `;
});

export default Spinner;
