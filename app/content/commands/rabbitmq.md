---
title: RabbitMQ
description: A list of useful commands for RabbitMQ management
---

## Start node app

```bash
rabbitmqctl -n <name>@<hostname> start_app
```

## Stop node app

Useful for adding or removing a node from a cluster.

```bash
rabbitmqctl -n <name>@<hostname> stop_app
```

## Reset node

This will remove the node from the cluster if the node is stopped.

```bash
rabbitmqctl -n <name>@<hostname> reset
```

## Remove node from cluster

First node is one node in the cluster. The second one is the node that will be removed from the cluster.

In order to remove a node from the cluster, the node must be stopped.

```bash
rabbitmqctl -n <name>@<hostname> forget_cluster_node <node>
```

## Add node to cluster

First node is the node that will join the cluster. The second node is the node that is already in the cluster.

```bash
rabbitmqctl -n <name>@<hostname> join_cluster <node>
```
