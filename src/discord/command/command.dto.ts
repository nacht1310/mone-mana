import { NumberOption, StringOption } from 'necord';

export class AddSpendingCommandDTO {
  @NumberOption({
    name: 'amount',
    description: 'Amount of spending',
    required: true,
  })
  amount: number;

  @StringOption({
    name: 'description',
    description: 'Description of spending',
    required: true,
  })
  description: string;

  @StringOption({
    name: 'category',
    description: 'Category to manage for spending',
    required: false,
  })
  category: string;
}

export class EditSpendingCommandDTO {
  @NumberOption({
    name: 'id',
    description: 'ID of the spending record',
    required: true,
  })
  id: number;

  @NumberOption({
    name: 'amount',
    description: 'Amount of spending',
    required: false,
  })
  amount: number;

  @StringOption({
    name: 'description',
    description: 'Description of spending',
    required: false,
  })
  description: string;

  @StringOption({
    name: 'category',
    description: 'Category to manage for spending',
    required: false,
  })
  category: string;
}

export class DeleteSpendingCommandDTO {
  @NumberOption({
    name: 'id',
    description: 'ID of the spending record',
    required: true,
  })
  id: number;
}
