import '../fonts/Inter/inter.scss';
import '../fonts/Roboto/roboto.scss';
import '../styles/index.scss';
import '../styles/styles.scss';

const hello = document.querySelector<HTMLDivElement>('.hello');
if (hello) {
  hello.textContent = 'Landing page starter is running';
}
