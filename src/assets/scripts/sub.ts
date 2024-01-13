import gsap from 'gsap';

function hoge(): void {
  console.log('sub');
  gsap.to('body', {
    autoAlpha: 0,
  });
}

hoge();
