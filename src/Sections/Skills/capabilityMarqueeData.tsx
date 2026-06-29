import type { ReactNode } from 'react';
import {
  siCss,
  siDocker,
  siGithubactions,
  siGithubcopilot,
  siGooglecloud,
  siHtml5,
  siJavascript,
  siMantine,
  siNextdotjs,
  siNextra,
  siNodedotjs,
  siOctopusdeploy,
  siOpenapiinitiative,
  siOpentelemetry,
  siPostgresql,
  siReact,
  siReactivex,
  siRedis,
  siTerraform,
  siTypescript,
  type SimpleIcon,
} from 'simple-icons';
import {
  BrandIcon,
  BrandIconMarqueeItem,
  type BrandIconMarqueeItemProps,
} from '@/components/BrandIcons/_BrandIcon';
import { AwsColor, AwsIcon } from '@/components/BrandIcons/AwsIcon';
import { AzureColor, AzureIcon } from '@/components/BrandIcons/AzureIcon';
import { CSharpColor, CSharpIcon } from '@/components/BrandIcons/CSharpIcon';
import { DotNetColor, DotNetIcon } from '@/components/BrandIcons/DotNetIcon';
import type { ResumeSkill } from '@/data';

type CapabilityMarqueeItemData = {
  brandColor: BrandIconMarqueeItemProps['brandColor'];
  icon: BrandIconMarqueeItemProps['icon'];
  label?: string;
  textColor: BrandIconMarqueeItemProps['textColor'];
};

const brand = (
  icon: CapabilityMarqueeItemData['icon'],
  brandColor: CapabilityMarqueeItemData['brandColor'],
  textColor: CapabilityMarqueeItemData['textColor'] = 'white',
  label?: string
): CapabilityMarqueeItemData => ({ brandColor, icon, label, textColor });

const simpleIcon = (
  simpleIconData: SimpleIcon,
  textColor: CapabilityMarqueeItemData['textColor'] = 'white',
  label?: string
): CapabilityMarqueeItemData => ({
  brandColor: `#${simpleIconData.hex}`,
  icon: ({ color, size }) => (
    <BrandIcon color={color} size={size}>
      <path d={simpleIconData.path} />
    </BrandIcon>
  ),
  label: label ?? simpleIconData.title,
  textColor,
});

const capabilityLookup = {
  React: simpleIcon(siReact, 'black'),
  TypeScript: simpleIcon(siTypescript),
  JavaScript: simpleIcon(siJavascript, 'black'),
  'Next.js': simpleIcon(siNextdotjs),
  Mantine: simpleIcon(siMantine),
  Nextra: simpleIcon(siNextra),
  HTML5: simpleIcon(siHtml5),
  CSS: simpleIcon(siCss),
  '.NET': brand(DotNetIcon, DotNetColor),
  'C#': brand(CSharpIcon, CSharpColor),
  'Node.js': simpleIcon(siNodedotjs),
  PostgreSQL: simpleIcon(siPostgresql),
  Redis: simpleIcon(siRedis),
  OpenAPI: simpleIcon(siOpenapiinitiative, 'white', 'OpenAPI'),
  ReactiveX: simpleIcon(siReactivex),
  AWS: brand(AwsIcon, AwsColor),
  Azure: brand(AzureIcon, AzureColor, 'white', 'Microsoft Azure'),
  GCP: simpleIcon(siGooglecloud),
  Docker: simpleIcon(siDocker, 'black'),
  Terraform: simpleIcon(siTerraform),
  'GitHub Actions': simpleIcon(siGithubactions),
  'Octopus Deploy': simpleIcon(siOctopusdeploy),
  OpenTelemetry: simpleIcon(siOpentelemetry),
  'GitHub Copilot': simpleIcon(siGithubcopilot),
} satisfies Record<ResumeSkill, CapabilityMarqueeItemData>;

export const getSkillMarqueeItems = (skills: readonly ResumeSkill[]): ReactNode[] =>
  skills.map((skill) => {
    const capability = capabilityLookup[skill];

    return (
      <BrandIconMarqueeItem
        key={skill}
        icon={capability.icon}
        label={capability.label ?? skill}
        brandColor={capability.brandColor}
        textColor={capability.textColor}
      />
    );
  });
