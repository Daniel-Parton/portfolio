import { BrandIcon, BrandIconMarqueeItem } from './_BrandIcon';
import { BrandIconProps } from './BrandIcon.types';

export const TerraformColor = '#844FBA';

export const TerraformIcon = (props: Omit<BrandIconProps, 'viewBox'>) => {
  return (
    <BrandIcon {...props}>
      <path d="M1.44 0v7.575l6.561 3.79V3.787zm21.12 4.227l-6.561 3.791v7.574l6.56-3.787zM8.72 4.23v7.575l6.561 3.787V8.018zm0 8.405v7.575L15.28 24v-7.578z" />
    </BrandIcon>
  );
};

export const TerraformMarqueeItem = () => {
  return (
    <BrandIconMarqueeItem
      icon={TerraformIcon}
      label="Terraform"
      brandColor={TerraformColor}
      textColor="white"
    />
  );
};
