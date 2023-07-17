import React, { useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';

function HolaTensorflow() {
  useEffect(() => {
    async function doTraining(model) {
      const xs = tf.tensor2d([-1.0, 0.0, 1.0, 2.0, 3.0, 4.0], [6, 1]);
      const ys = tf.tensor2d([-3.0, -1.0, 2.0, 3.0, 5.0, 7.0], [6, 1]);

      const history = await model.fit(xs, ys, {
        epochs: 500,
        callbacks: {
          onEpochEnd: async (epoch, logs) => {
            console.log(`Epoch: ${epoch} Loss: ${logs.loss}`);
          },
        },
      });
    }

    async function runTensorFlow() {
      const model = tf.sequential();
      model.add(tf.layers.dense({ units: 1, inputShape: [1] }));
      model.compile({ loss: 'meanSquaredError', optimizer: 'sgd' });
      model.summary();

      await doTraining(model);

      const input = tf.tensor2d([10], [1, 1]);
      const prediction = model.predict(input);
      prediction.print();
    }

    runTensorFlow();
  }, []);

  return <h1>Hello World</h1>;
}

export default HolaTensorflow;
