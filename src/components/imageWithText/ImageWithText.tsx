import { Image, Text, Stack, Title, Box } from '@mantine/core';

interface ImageTextCardProps {
  imageSrc: string;
  alt?: string;
  title: string;
  description: any;
  imageRight?: boolean;
}

export default function ImageTextCard({
  imageSrc,
  alt,
  title,
  description,
  imageRight = false, 
}: ImageTextCardProps) {
  return (
    <>
      <style>
        {`
          @media (max-width: 768px) {
            .image-text-card {
              flex-direction: column !important;
            }
          }
        `}
      </style>

      <Box
        className="image-text-card"
        style={{
          display: 'flex',
          flexDirection: imageRight ? 'row-reverse' : 'row',
          gap: 16,
          alignItems: 'stretch',
          padding: 16,
          borderRadius: 8,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          background: 'var(--color-honey-bg)',
          flexWrap: 'wrap',
        }}
      >
        <Box
          style={{
            flex: 1,
            borderRadius: 8,
            overflow: 'hidden',
            boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
          }}
        >
          <Image
            src={imageSrc}
            alt={alt || title}
            fit="cover"
            height="100%"
            width="100%"
          />
        </Box>

        <Stack gap="xs" style={{ flex: 1, minWidth: 200, justifyContent: 'center' }}>
          <Title order={3}>{title}</Title>
          <Text size="md">{description}</Text>
        </Stack>
      </Box>
    </>
  );
}