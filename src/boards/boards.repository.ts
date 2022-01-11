import { EntityRepository, Repository } from "typeorm";
import { Board } from "./boards.entity";

@EntityRepository(Board) // 이 클래스가 Board를 관리하는 repository 라는 것을 알려줌
export class BoardRepository extends Repository<Board>{
    
// entity를 컨트롤하기 위해서는 extends Repository를 해줘야함
}