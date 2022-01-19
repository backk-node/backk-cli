import { Entity, IsAnyString, Lengths, MaxLength, NotUnique, ReadWrite, _Id } from 'backk';

@Entity()
export default class ExampleEntity extends _Id {
  @MaxLength(Lengths._64)
  @IsAnyString()
  @NotUnique()
  @ReadWrite()
  public exampleProperty!: string;
}
