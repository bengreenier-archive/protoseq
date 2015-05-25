# protoseq

[![Build Status](https://travis-ci.org/bengreenier/protoseq.svg?branch=master)](https://travis-ci.org/bengreenier/protoseq)

a little module for handing out protocol sequencing numbers. just `npm install protoseq`.

# examples

```
var protoseq = require('protoseq');

// hand out seq
var nextSeq = protoseq();

// ... do something

// turn in seq 
protoseq(nextSeq);
```

```
var Sequencer = require('protoseq').Sequencer;

var instance = new Sequencer();

var nextSeq = instance.getNext();

// ... do something

instance.turnIn(nextSeq);
```

```
var protoseq = require('protoseq');

// hand out seqs
var nextSeq = protoseq();
var nextSeq = protoseq();
var nextSeq = protoseq();
var nextSeq = protoseq();
var nextSeq = protoseq();

// ... do something

// oops i lost track of the seqs! let's turn in everything
protoseq.reset();
```


```
var Sequencer = require('protoseq').Sequencer;

var instance = new Sequencer();

var nextSeq = instance.getNext();


// hand out seqs
var nextSeq = instance.getNext();
var nextSeq = instance.getNext();
var nextSeq = instance.getNext();
var nextSeq = instance.getNext();
var nextSeq = instance.getNext();

// ... do something

// oops i lost track of the seqs! let's turn in everything
delete instance;
instance = new Sequencer();
```

# api

## ([optional]turnIn)

a singleton function that hands out sequence numbers (if no parameter), and turns in sequence numbers (if parameter).

## reset()

clears the singleton function's backing pool. this is equivalent to turning everything in.

## Sequencer

returns the constructor for the actual `Sequencer` object. the constructor takes no parameters.

### Sequencer.getNext()

hands out a sequence number from the given sequencer instance. returns `Number`.

### Sequencer.turnIn(value)

turns in a sequence number, if it's currently handed out. returns `Number` (0 on failure, 1 on success)

### Sequencer.length()

returns the `Number` of currently handed out sequence numbers.