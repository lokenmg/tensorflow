import React, { useState } from 'react';
import * as tf from '@tensorflow/tfjs';

function Prueba() {
    const [Model, setModel] = useState(null);
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
        setModel(model);
        
    }

    const Create = () => {
        runTensorFlow();
    }

    const train =async () => {
        if(Model==null){
            console.log("no hay modelo");
        }else{
        await doTraining(Model);

        const input = tf.tensor2d([10], [1, 1]);
        const prediction = Model.predict(input);
        prediction.print();
        }
    }

    return (
        <>
            <button onClick={Create}>crear</button>
            <button onClick={train}>Entrenar</button>
        </>
      );
}
export default Prueba;