import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardStatus } from './board-status.enum';
import { Board } from './boards.entity';
import { BoardRepository } from './boards.repository';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
    constructor(
        @InjectRepository(BoardRepository) // boardservice 안에서 boardrepository 사용하기 위해서
        private boardsRepository: BoardRepository){
        }

    createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
        return this.boardsRepository.createBoard(createBoardDto);
    }

    async getAllBoards(): Promise <Board[]> {
        return this.boardsRepository.find();
    }
    
    async getBoardById(id: number): Promise <Board> {
        const found = await this.boardsRepository.findOne(id);
        if(!found){
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }
        return found;
    }

    async deleteBoard(id: number): Promise<void> {
        const result = await this.boardsRepository.delete(id);
        
        if(result.affected === 0){
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }
    }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        const board = await this.getBoardById(id);

        board.status = status;
        await this.boardsRepository.save(board);

        return board;
    }
}
