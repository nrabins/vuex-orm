import { Record } from '../../data/Contract'
import Model from '../../model/Model'
import Type from './Type'

export type Mutator = (value: any) => any

export default class Attr extends Type {
  /**
   * The value of the field.
   */
  value: any

  /**
   * Mutator for the field.
   */
  mutator?: Mutator

  /**
   * Create a new attr instance.
   */
  constructor (model: typeof Model, value: any, mutator?: Mutator) {
    super(model)

    this.value = value
    this.mutator = mutator
  }

  /**
   * Normalize the given value. This method is called during data normalization
   * to generate appropriate value to be saved to Vuex Store.
   */
  normalize (value: any): any {
    return this.fill(value)
  }

  /**
   * Return the default value if the given value is empty.
   */
  fill (value: any): any {
    return value !== undefined ? value : this.value
  }

  /**
   * Make value to be set to model property. This method is used when
   * instantiating model to set its properties.
   */
  make (value: any, _parent: Record, key: string): any {
    const mutator = this.mutator || this.model.mutators()[key]

    return mutator ? mutator(value) : value
  }
}