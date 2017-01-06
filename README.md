# unmapped

This project trains a [ConvNet](https://en.wikipedia.org/wiki/Convolutional_neural_network) using OSM as ground truth, to automate the search of unmapped roads in OSM.

### Rationale

![missing roads](https://raw.githubusercontent.com/rodowi/unmapped/master/screenshots/missing-roads.jpg)

_Still many roads to map in OSM._

### Instructions

Generate training set

```bash
% export MAPBOX_ACCESS_TOKEN=pk.1001.foobar
% ./scripts/data.sh
% ./scripts/density.sh
% ./scripts/imagery.sh
```

Tiles containing highways in OSM.

![map](https://github.com/rodowi/unmapped/raw/master/screenshots/map.jpg)
![sat](https://github.com/rodowi/unmapped/raw/master/screenshots/sat.jpg)

Training

```bash
✗ docker run -it -v $HOME/c/unmapped/imagery:/tf_files/satellite gcr.io/tensorflow/tensorflow:latest-devel

root@3993bf4c0be8:~ cd /tensorflow/
root@3993bf4c0be8:/tensorflow# python tensorflow/examples/image_retraining/retrain.py --bottleneck_dir=/tf_files/bottlenecks --output_graph=/tf_files/retrained_graph.pb --output_labels=/tf_files/retrained_labels.txt --image_dir /tf_files/satellite
>> Downloading inception-2015-12-05.tgz 100.0%
Successfully downloaded inception-2015-12-05.tgz 88931400 bytes.
Looking for images in 'highway'
Looking for images in 'noway'
Creating bottleneck at /tf_files/bottlenecks/highway/11448-26515-16.jpg.txt
Creating bottleneck at /tf_files/bottlenecks/highway/11451-26502-16.jpg.txt
Creating bottleneck at /tf_files/bottlenecks/highway/11455-26498-16.jpg.txt
...
2017-01-04 05:23:14.191868: Step 0: Train accuracy = 88.0%
2017-01-04 05:23:14.192086: Step 0: Cross entropy = 0.645307
2017-01-04 05:23:14.650036: Step 0: Validation accuracy = 79.0%
2017-01-04 05:23:18.811447: Step 10: Train accuracy = 81.0%
2017-01-04 05:23:18.811610: Step 10: Cross entropy = 0.472717
2017-01-04 05:23:19.189587: Step 10: Validation accuracy = 85.0%
...
2017-01-01 03:02:53.240915: Step 490: Train accuracy = 96.0%
2017-01-01 03:02:53.241116: Step 490: Cross entropy = 0.167174
2017-01-01 03:02:53.588690: Step 490: Validation accuracy = 87.0%
2017-01-01 03:02:56.710327: Step 499: Train accuracy = 91.0%
2017-01-01 03:02:56.710478: Step 499: Cross entropy = 0.211515
2017-01-01 03:02:57.068353: Step 499: Validation accuracy = 84.0%
Final test accuracy = 88.8%
```

Prediction

```bash
root@5cca0bc5d586:/tensorflow# bazel-bin/tensorflow/examples/label_image/label_image --graph=/tf_files/retrained_graph.pb --labels=/tf_files/retrained_labels.txt --output_layer=final_result --image=/tf_files/satellite/11856-26822-16.jpg
I tensorflow/examples/label_image/main.cc:205] highway (0): 0.907585
I tensorflow/examples/label_image/main.cc:205] noway (1): 0.0924149
```

![unmapped](https://raw.githubusercontent.com/rodowi/unmapped/master/screenshots/11820-26685-16.jpg)

[90% chance there's an unmapped road at 16/11820/26685](https://b.tiles.mapbox.com/v4/mapbox.satellite/16/11856/26822@2x.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IlpIdEpjOHcifQ.Cldl4wq_T5KOgxhLvbjE-w)

Go to [Wiki](https://github.com/rodowi/unmapped/wiki/Results) to see more prediction results.
