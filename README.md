# unmapped

Finding unmapped roads from satellite imagery.

Training set

```bash
% export MAPBOX_ACCESS_TOKEN=pk.1001.foobar
% ./scripts/data.sh
% ./scripts/density.sh
% ./scripts/imagery.sh
```

Prediction

```bash
root@5cca0bc5d586:/tensorflow# bazel-bin/tensorflow/examples/label_image/label_image --graph=/tf_files/retrained_graph.pb --labels=/tf_files/retrained_labels.txt --output_layer=final_result --image=/tf_files/satellite/11856-26822-16.jpg
I tensorflow/examples/label_image/main.cc:205] highway (0): 0.907585
I tensorflow/examples/label_image/main.cc:205] noway (1): 0.0924149
```

![unmapped](https://raw.githubusercontent.com/rodowi/unmapped/master/screenshots/11820-26685-16.jpg)

[90% chance there's an unmapped road at 16/11820/26685](https://b.tiles.mapbox.com/v4/mapbox.satellite/16/11856/26822@2x.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IlpIdEpjOHcifQ.Cldl4wq_T5KOgxhLvbjE-w)
