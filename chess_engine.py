import chess
import random
import time
import copy

white_wins = 0
black_wins = 0
draws = 0

SLEEPTIME = 0

def printBoard(board, oldBoard):
    boardStr = str(board)
    boardArr = [boardLine.split(' ') for boardLine in boardStr.split('\n')]
    oldBoardStr = str(oldBoard)
    oldBoardArr = [boardLine.split(' ') for boardLine in oldBoardStr.split('\n')]
    for r in xrange(len(boardArr)):
        for c in xrange(len(boardArr[r])):
            if(boardArr[r][c] != oldBoardArr[r][c]):
                print r, c, boardArr[r][c]

while True:
    board = chess.Board()
    
    move_count = 0
    turn = 0
    
    while not board.is_game_over():
        moves = list(board.legal_moves)
        new_moves = []
        for move in moves:
            if board.is_capture(move):
                new_moves.append(move)
        moves += new_moves * 3
        move = random.choice(moves)
        oldBoard = copy.copy(board)
        board.push(move)
        move_count += 1
        turn = (turn + 1) % 2
        printBoard(board, oldBoard)
        time.sleep(SLEEPTIME)
    
    if board.is_checkmate():
        if turn == 0:
            black_wins += 1
        else:
            white_wins += 1
    else:
        draws += 1
        
    print 'whitescore', white_wins
    print 'blackscore', black_wins
    print 'draws', draws
    