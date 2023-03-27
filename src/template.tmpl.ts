export const template = `
<div class="{{ wrapperClassName }}">
  <div class="chat__button">
    <button class="button" onclick="{{ handleClick }}">
      <span>{{ buttonText }}</span>
    </button>
  </div>

  <ul class="{{ chatListClassName }}">
    {{ chatListItems }}
  </ul>
</div>
`;