import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EmojiService {
  constructor() {}

  name = 'Angular';
  message = '';
  showEmojiPicker = false;
  sets = [
    'native',
    'google',
    'twitter',
    'facebook',
    'emojione',
    'apple',
    'messenger',
  ];
  set = 'twitter';
  // toggleEmojiPicker() {
  //   console.log(this.showEmojiPicker);
  //   this.showEmojiPicker = !this.showEmojiPicker;
  // }

  // addEmoji(event: any) {
  //   console.log(this.message);
  //   const { message } = this;
  //   console.log(message);
  //   console.log(`${event.emoji.native}`);
  //   const text = `${message}${event.emoji.native}`;

  //   this.message = text;
  //   // this.showEmojiPicker = false;
  // }

  onFocus() {
    console.log('focus');
    this.showEmojiPicker = false;
  }

  onBlur() {
    console.log('onblur');
  }

  // showEmojiPicker = false;
  // message: string = '';

  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;

    // Add or remove class based on emoji picker visibility
    const textAreaElement = document.querySelector(
      '.text-area-messages'
    ) as HTMLElement;
    if (this.showEmojiPicker) {
      textAreaElement?.classList.add('show-emoji-picker');
    } else {
      textAreaElement?.classList.remove('show-emoji-picker');
    }
  }

  addEmoji(event: any) {
    this.message += event.emoji.native; // Append selected emoji to the message
  }

  // Close the emoji picker if user clicks outside of the emoji picker
  closeEmojiPicker() {
    this.showEmojiPicker = false;
    const textAreaElement = document.querySelector(
      '.text-area-messages'
    ) as HTMLElement;
    textAreaElement?.classList.remove('show-emoji-picker');
  }

  // Stop propagation to prevent closing the emoji picker when clicking inside the emoji picker
  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}
