export const template = `
<div class="{{ wrapperClassName }}">
  <div class="chat__button">
    <input type="text" class="{{ inputClassName }}" oninput="{{ changeHandler }}">
    <button class="button" onclick="{{ handleClick }}" type="button">
      <span>{{ buttonText }}</span>
    </button>
  </div>

  <ul class="{{ chatListClassName }}">
    {{ chatListItems }}
  </ul>
</div>
`;