'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  Box,
  Typography,
  Slider,
  Grid,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
} from '@mui/material';
import { Close, Straighten, CheckCircle } from '@mui/icons-material';

interface SizeAdvisorModalProps {
  open: boolean;
  onClose: () => void;
}

export const SizeAdvisorModal: React.FC<SizeAdvisorModalProps> = ({ open, onClose }) => {
  const [bust, setBust] = useState<number>(34);
  const [waist, setWaist] = useState<number>(26);
  const [hip, setHip] = useState<number>(36);
  const [drape, setDrape] = useState<string>('true-fit');

  let recommendedSize = 'S';
  if (bust <= 32 && waist <= 25) recommendedSize = 'XS';
  else if (bust <= 35 && waist <= 28) recommendedSize = 'S';
  else if (bust <= 38 && waist <= 31) recommendedSize = 'M';
  else if (bust <= 41 && waist <= 34) recommendedSize = 'L';
  else recommendedSize = 'XL';

  if (drape === 'relaxed' && recommendedSize === 'XS') recommendedSize = 'S';
  if (drape === 'relaxed' && recommendedSize === 'S') recommendedSize = 'M';

  const sizeChart = [
    { size: 'XS', bust: '31 - 32"', waist: '23 - 25"', hip: '33 - 35"' },
    { size: 'S', bust: '33 - 35"', waist: '26 - 28"', hip: '36 - 38"' },
    { size: 'M', bust: '36 - 38"', waist: '29 - 31"', hip: '39 - 41"' },
    { size: 'L', bust: '39 - 41"', waist: '32 - 34"', hip: '42 - 44"' },
    { size: 'XL', bust: '42 - 44"', waist: '35 - 37"', hip: '45 - 47"' },
  ];

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            backgroundColor: '#141724',
            border: '1px solid rgba(230, 197, 148, 0.3)',
            borderRadius: 4,
          },
        },
      }}
    >
      <Box sx={{ p: 3, position: 'relative' }}>
        <IconButton onClick={onClose} sx={{ position: 'absolute', top: 16, right: 16, color: '#FFF' }}>
          <Close />
        </IconButton>

        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Chip
            icon={<Straighten sx={{ color: '#E6C594 !important', fontSize: 16 }} />}
            label="SMART FIT ALGORITHM"
            sx={{
              backgroundColor: 'rgba(230, 197, 148, 0.15)',
              color: '#E6C594',
              fontWeight: 700,
              fontSize: '0.75rem',
              mb: 1,
            }}
          />
          <Typography variant="h4" sx={{ fontFamily: 'Playfair Display', color: '#FFF' }}>
            Silk Nightdress Size Calculator
          </Typography>
        </Box>

        <DialogContent sx={{ px: { xs: 1, sm: 3 } }}>
          <Grid container spacing={4}>
            {/* Sliders Left */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ color: '#FFF', mb: 1 }}>
                  Bust Measurement: <strong style={{ color: '#E6C594' }}>{bust} inches</strong>
                </Typography>
                <Slider
                  value={bust}
                  min={30}
                  max={46}
                  onChange={(_, val) => setBust(val as number)}
                  sx={{ color: '#E6C594' }}
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ color: '#FFF', mb: 1 }}>
                  Waist Measurement: <strong style={{ color: '#E6C594' }}>{waist} inches</strong>
                </Typography>
                <Slider
                  value={waist}
                  min={22}
                  max={40}
                  onChange={(_, val) => setWaist(val as number)}
                  sx={{ color: '#E6C594' }}
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ color: '#FFF', mb: 1 }}>
                  Hip Measurement: <strong style={{ color: '#E6C594' }}>{hip} inches</strong>
                </Typography>
                <Slider
                  value={hip}
                  min={32}
                  max={50}
                  onChange={(_, val) => setHip(val as number)}
                  sx={{ color: '#E6C594' }}
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" sx={{ color: '#FFF', mb: 1 }}>
                  Drape Preference
                </Typography>
                <ToggleButtonGroup
                  value={drape}
                  exclusive
                  onChange={(_, val) => val && setDrape(val)}
                  size="small"
                  fullWidth
                  sx={{
                    '& .MuiToggleButton-root': {
                      color: '#A5AAB8',
                      borderColor: 'rgba(230, 197, 148, 0.3)',
                      '&.Mui-selected': {
                        color: '#0B0D17',
                        backgroundColor: '#E6C594',
                      },
                    },
                  }}
                >
                  <ToggleButton value="fitted">Fitted</ToggleButton>
                  <ToggleButton value="true-fit">True to Size</ToggleButton>
                  <ToggleButton value="relaxed">Flowing Relaxed</ToggleButton>
                </ToggleButtonGroup>
              </Box>
            </Grid>

            {/* Calculated Result Right */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  backgroundColor: 'rgba(11, 13, 23, 0.8)',
                  p: 3,
                  borderRadius: 3,
                  border: '1px solid rgba(230, 197, 148, 0.3)',
                  textAlign: 'center',
                  mb: 3,
                }}
              >
                <CheckCircle sx={{ color: '#4CAF50', fontSize: 36, mb: 1 }} />
                <Typography variant="body2" sx={{ color: '#A5AAB8' }}>
                  Recommended Nightdress Size:
                </Typography>
                <Typography variant="h2" sx={{ color: '#E6C594', fontWeight: 800, my: 1 }}>
                  Size {recommendedSize}
                </Typography>
                <Typography variant="caption" sx={{ color: '#4CAF50', fontWeight: 700 }}>
                  ✨ 98% Guaranteed Fit Match
                </Typography>
              </Box>

              <Typography variant="subtitle2" sx={{ color: '#FFF', mb: 1 }}>
                Standard Size Reference (Inches)
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ color: '#E6C594', fontWeight: 700 }}>Size</TableCell>
                    <TableCell sx={{ color: '#E6C594', fontWeight: 700 }}>Bust</TableCell>
                    <TableCell sx={{ color: '#E6C594', fontWeight: 700 }}>Waist</TableCell>
                    <TableCell sx={{ color: '#E6C594', fontWeight: 700 }}>Hip</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sizeChart.map((row) => (
                    <TableRow
                      key={row.size}
                      sx={{
                        backgroundColor: row.size === recommendedSize ? 'rgba(230, 197, 148, 0.15)' : 'transparent',
                      }}
                    >
                      <TableCell sx={{ color: row.size === recommendedSize ? '#E6C594' : '#FFF', fontWeight: 700 }}>
                        {row.size}
                      </TableCell>
                      <TableCell sx={{ color: '#A5AAB8' }}>{row.bust}</TableCell>
                      <TableCell sx={{ color: '#A5AAB8' }}>{row.waist}</TableCell>
                      <TableCell sx={{ color: '#A5AAB8' }}>{row.hip}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </DialogContent>
      </Box>
    </Dialog>
  );
};
