import * as words from '../../json/words.json';

export function generateWords() {
  return `${words[Math.floor(Math.random() * 178189)]}`;
}
