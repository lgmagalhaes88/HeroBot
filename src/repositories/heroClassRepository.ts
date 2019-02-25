import { Repository, EntityRepository } from "typeorm";
import { dbConnection } from "../../dbconn";
import { HeroClass } from "../entity/heroClass";
import { ClassName, ClassNameEvolve } from "../enums/className";
import { Emojis } from "../enums/emojis";

@EntityRepository(HeroClass)
export class HeroClassRepository extends Repository<HeroClass> {
  /**
   * Searchs for an heroClass using his name
   * @returns HeroClass object
   * @throws QueryError
   */
  async findByName(heroClass: ClassName | ClassNameEvolve): Promise<HeroClass> {
    try {
      return await super.findOne({ name: heroClass.valueOf() });
    } catch (error) {
      console.log(error);
      return Promise.reject(
        "We found a problem when searching for our clasess list. " +
          +" Please, try again later " +
          Emojis.SAD_CRYING
      );
    }
  }

  /**
   * Returns the fist class of a hero in the game (Begginner)
   */
  async findDefaultClassName(): Promise<HeroClass> {
    try {
      return await super.findOne({ name: ClassName.BEGGINNER });
    } catch (error) {
      console.log(error);
      return Promise.reject(
        "We found a problem when creating your assignature" +
          +" of new hero. Try again later " +
          Emojis.SAD_CRYING
      );
    }
  }
}

export function getHeroClassepository(): HeroClassRepository {
  return dbConnection.getCustomRepository(HeroClassRepository);
}