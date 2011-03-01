/**
 * States of the game - each state has the following functions common to them:
 * - start() : called when state is initialized
 * - exit() : called when state is exiting (popped off the stack)
 * - draw() : called when the game loop attempts to render graphics
 * - update() : called when the game loop attempts to update game state
 **/
MS.State = {};