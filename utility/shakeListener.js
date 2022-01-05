import { Accelerometer } from 'expo-sensors';

// Higher => More Shake needed
// Lower => More Sensitive, Less Shake needed
// speed (which is compared to the threshold is affected by accelerometerInterval)
const threshold = 110;

const accelerometerInterval = 300;

/**
 * Adds a listener for shake events
 * @param {function} handler A callback for when a shake event occurs
 * @returns {Subscription} A subscription that you can call remove() on when you would like to unsubscribe the listener.
 *
 * @example
 * ```
 *  useEffect(() => {
 *   const subscription = addShakeListener(() => {
 *     console.log('handled');
 *   });
 *   return () => {
 *     subscription.remove();
 *   };
 * }, []);
 * ```
 */
const addShakeListener = (handler) => {
  let lastX;
  let lastY;
  let lastZ;
  let lastUpdate = 0;

  Accelerometer.setUpdateInterval(accelerometerInterval);

  return Accelerometer.addListener(({ x, y, z }) => {
    const currTime = Date.now();
    const diffTime = currTime - lastUpdate;
    lastUpdate = currTime;

    const speed =
      (Math.abs(x + y + z - lastX - lastY - lastZ) / diffTime) * 10000;

    if (speed > threshold) {
      handler();
    }

    lastX = x;
    lastY = y;
    lastZ = z;
  });
};
export default addShakeListener;
