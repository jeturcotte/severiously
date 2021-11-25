const cvs = document.querySelector('canvas');
const c = cvs.getContext('2d');

cvs.width = window.innerWidth;
cvs.height = window.innerHeight;

window.addEventListener('resize', function () {
  cvs.width = window.innerWidth;
  cvs.height = window.innerHeight;
});

class Bar {

  constructor( x, y, is_vert, depth, movement ) {
    if (is_vert) {
      this.ulx = x - depth/2;
      this.uly = 0;
      this.lrx = x + depth/2;
      this.lry = cvs.height;
    } else {
      this.ulx = 0;
      this.uly = y - depth/2;
      this.lrx = cvs.width;
      this.lry = y + depth/2;
    }
    if ( Math.random() < 0.5 ) {
      this.movement = movement;
    } else {
      this.movement = -movement;
    }
    
    this.is_vert = is_vert;

    let bArray = ['999','AAA','BBB','CCC','DDD','EEE','FFF'];
    let sArray = ['000000','111111','222222','333333','444444'];
    if ( Math.random() < 0.05 ) {
      this.color = '#' + bArray[Math.floor(Math.random() * bArray.length)] + bArray[Math.floor(Math.random() * bArray.length)]; // + bArray[Math.floor(Math.random() * bArray.length)];
    } else {
      this.color = '#' + sArray[Math.floor(Math.random() * sArray.length)];
    }
    
  }

  draw = () => {
    c.beginPath();
    c.moveTo( this.ulx, this.uly );
    c.lineTo( this.lrx, this.uly );
    c.lineTo( this.lrx, this.lry );
    c.lineTo( this.ulx, this.lry );
    c.lineTo( this.ulx, this.uly );
    c.closePath();

    c.fillStyle = this.color;
    c.fill();

    this.update();
  }

  update = () => {
    if ( this.is_vert ) {
      if ( this.ulx <= 0 || this.lrx >= cvs.width ) {
        this.movement = -this.movement;
        console.log( 'moon' );
      }
      this.ulx += this.movement;
      this.lrx += this.movement;
    } else {
      if ( this.uly <= 0 || this.lry >= cvs.height ) {
        this.movement = -this.movement;
      }
      this.uly += this.movement;
      this.lry += this.movement;
    }
  }

}

let barArray = [];
let nBars = Math.floor(Math.random()*40)+10;

for (let i = 0; i < nBars; i++) {
  let depth = Math.random() * 140 + 10;
  let is_vert = Math.random() < 0.5;
  let x = (window.innerWidth * 0.25) + Math.random() * (window.innerWidth * 0.5);
  let y = (window.innerHeight * 0.25) + Math.random() * (window.innerHeight * 0.5);
  let movement = ((-0.5 + Math.random()) / 10) + 0.05;
  barArray.push( new Bar( x, y, is_vert, depth, movement ) );
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, window.innerWidth, window.innerHeight);

  barArray.forEach( bar => {
    bar.draw();
  });
};

animate();
