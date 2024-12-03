import { LuBrainCircuit } from 'react-icons/lu';
import { MenuRootProps } from '@chakra-ui/react';

import { Button } from '@/components/ui/button';
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from '@/components/ui/menu';
import { AIProvider, AIProviders } from '@/configs/aiProviders';

interface AIProvidersDropdownProps extends Omit<MenuRootProps, 'children'> {
  value: AIProvider;
  readonly?: boolean;
  onChange: (val: AIProvider) => void;
}

const AIProvidersDropdown = ({ value, readonly, onChange, ...rest }: AIProvidersDropdownProps) => {
  return (
    <MenuRoot {...rest}>
      <MenuTrigger asChild>
        <Button variant='outline' rounded='full' size='sm' disabled={!!readonly}>
          <LuBrainCircuit /> {AIProviders[value].name}
        </Button>
      </MenuTrigger>
      <MenuContent>
        {Object.values(AIProviders).map((provider) => (
          <MenuItem key={provider.id} value={provider.id} onClick={() => onChange(provider.id)}>
            {provider.name}
          </MenuItem>
        ))}
      </MenuContent>
    </MenuRoot>
  );
};
export default AIProvidersDropdown;
