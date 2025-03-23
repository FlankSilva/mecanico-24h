'use client';

import { FormEvent, useState } from 'react';

import { Button } from '@/components/elements/form/button';
import { CheckboxList } from '@/components/elements/form/checkbox';
import { Input } from '@/components/elements/form/input';
import { ImageUpload } from '@/components/elements/form/inputFile';
import { Options, SelectDropdown } from '@/components/elements/form/select';
import { storageAuthTokenGet } from '@/storage/authToken';
import { SelectProps } from '@/types/selectProps';
import { useRouter } from 'next/navigation';

type FormProps = {
  statesOptions: SelectProps[];
};

export function MechanicForm({ statesOptions }: FormProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [selectedCity, setSelectedCity] = useState<Options | Options[]>([]);
  const [otherValue, setOtherValue] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [commissionarioId, setCommissionarioId] = useState('');

  const router = useRouter();

  async function handleCreateNewMechanicUser(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const formData = new FormData();

    formData.append('specialties', selectedOptions.join(','));

    const selectedCityValue = Array.isArray(selectedCity)
      ? selectedCity.map(city => city.value).join(',')
      : selectedCity?.value || '';

    formData.append('cityId', selectedCityValue);

    if (selectedFile) {
      formData.append('photoUrl', selectedFile);
    }

    const token = storageAuthTokenGet();

    try {
      const response = await fetch('/api/users/mechanic', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();
      console.log('Cadastro realizado com sucesso:', result);
    } catch (error) {
      console.error('Erro ao enviar os dados:', error);
    }
  }

  return (
    <form className="flex flex-col" onSubmit={handleCreateNewMechanicUser}>
      <CheckboxList
        label="Serviços"
        otherValue={otherValue}
        selectedOptions={selectedOptions}
        setOtherValue={setOtherValue}
        setSelectedOptions={setSelectedOptions}
      />

      <ImageUpload
        previewUrl={previewUrl}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
        setPreviewUrl={setPreviewUrl}
      />

      <div className="w-full mt-4">
        <SelectDropdown
          label="Cidade"
          placeholder="Selecione a cidade"
          options={statesOptions}
          setSelectedOption={setSelectedCity}
          isMulti
        />
      </div>

      <div className="mt-4">
        <Input
          label="Id do commissionario"
          placeholder="Insira o id do commissionario"
          value={commissionarioId}
          onChange={e => setCommissionarioId(e.target.value)}
        />
      </div>

      <div className="w-full mt-5">
        <Button type="submit">
          <span className="text-white">Salvar</span>
        </Button>
      </div>
    </form>
  );
}
