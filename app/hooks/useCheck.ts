const instancePromise = new Promise<string>((resolve): void => {
        setTimeout(() => {
          console.log("HA TERMINADO");
          resolve('ESTA ES LA PATATA');
        }, 4000);
      });
let finished = false;
export default function useCheck() {
  if (!finished) {
    throw instancePromise.then(() => {
      finished = true;
    });
  }
}
