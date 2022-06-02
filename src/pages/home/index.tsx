import React from 'react'
import {
  Typography,
  Button,
  Box,
  Container,
  Card,
  CardMedia,
  CardContent,
  Paper,
} from '@mui/material'
import {DesktopMac} from '@mui/icons-material'
import {useStore} from 'effector-react'
import {Link} from 'react-router-dom'
import SQLImage from 'src/static/sql.png'
import NoSQLImage from 'src/static/nosql.webp'
import FirebirdLogo from 'src/static/firebird_logo.svg?raw'
import MongoLogo from 'src/static/mongodb_logo.svg?raw'
import MssqlLogo from 'src/static/mssql-logo.svg?raw'
import OracleLogo from 'src/static/oracle_logo.svg?raw'
import Neo4jLogo from 'src/static/neo4j-logo.svg?raw'
import PostgresqlLogo from 'src/static/postgresql.svg?raw'
import RedDBLogo from 'src/static/reddb_logo.svg?raw'
import {$themeMode} from 'src/shared/theme'

export const HomePage: React.FC = () => {
  const isDark = useStore($themeMode) === 'dark'

  const logos = [
    FirebirdLogo,
    MssqlLogo,
    OracleLogo,
    MongoLogo,
    Neo4jLogo,
    PostgresqlLogo,
    RedDBLogo,
  ]

  return (
    <Box
      display="flex"
      flexDirection="column"
      sx={{
        flex: 1,
      }}
    >
      <Box
        sx={{
          py: {xs: 3, sm: 6},
          px: {xs: 2, sm: 2, md: 0},
          display: 'flex',
          flexFlow: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          backgroundColor: '#252643',
          color: 'common.white',
        }}
      >
        <Box
          sx={{
            mb: 4,
            display: 'flex',
            flexWrap: 'wrap',
            gap: {xs: 2, sm: 4},
            flex: 1,
            justifyContent: {xs: 'center', sm: 'space-between'},
          }}
        >
          {logos.map((logo, id) => (
            <Paper
              variant="outlined"
              key={id}
              dangerouslySetInnerHTML={{__html: logo}}
              sx={{
                p: {xs: 2, sm: 4},
                width: {xs: 100, sm: 180},
                height: {xs: 100, sm: 180},
                maxWidth: {xs: 100, sm: '100%'},
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: isDark ? 'primary.light' : 'white',
                flex: 1,

                '& svg': {
                  height: '100%',
                },
              }}
            ></Paper>
          ))}
        </Box>
        <Typography
          variant="inherit"
          sx={{fontSize: {xs: 32, sm: 40, md: 54}, lineHeight: '48px'}}
          gutterBottom
        >
          Тренажер SQL & NoSQL
        </Typography>
        <Typography variant="h4">Интеллектуальное обучение SQL & NoSQL программированию</Typography>
      </Box>
      <Container maxWidth="lg" sx={{mt: 8, mb: 8, display: 'flex', flexFlow: 'column'}}>
        <Box
          sx={{
            display: 'flex',
            flexFlow: {xs: 'column', sm: 'row'},
            justifyContent: 'space-between',
            gap: 4,
          }}
        >
          <FeatureCard
            card={{
              title: '5 000+',
              description: 'Заданий на изучение SQL',
              image: SQLImage,
            }}
          />
          <FeatureCard
            card={{
              title: '600+',
              description: 'Заданий на изучение NoSQL',
              image: NoSQLImage,
            }}
          />
        </Box>
        {/* <Box sx={{display: 'flex', flexFlow: 'column', mt: 8}}>
          <Typography textAlign="center" variant="h1" sx={{fontWeight: '500', mb: 1}}>
            Системы управления БД
          </Typography>
          <Typography textAlign="center" variant="body1" sx={{mb: 4}}>
            для прохождения тестов
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: {xs: 2, sm: 4},
              flex: 1,
              justifyContent: {xs: 'center', sm: 'space-between'},
            }}
          >
            {logos.map((logo, id) => (
              <Paper
                key={id}
                dangerouslySetInnerHTML={{__html: logo}}
                sx={{
                  p: 4,
                  width: 200,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: isDark ? 'primary.light' : 'white',
                }}
              ></Paper>
            ))}
          </Box>
        </Box> */}
        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 10}}>
          <Button
            size="large"
            sx={{borderRadius: 2, py: 2, fontWeight: 'bold'}}
            variant="contained"
            component={Link}
            to="/about"
            startIcon={<DesktopMac />}
            aria-label="Подробнее"
          >
            Подробнее о системе
          </Button>
        </Box>
      </Container>
    </Box>
  )
}

type FeatureCardProps = {
  card: {description: string; title: string; image: string}
}
const FeatureCard = ({card}: FeatureCardProps) => {
  return (
    <Card sx={{display: 'flex', flex: 1}} elevation={2}>
      <CardMedia
        component="img"
        image={card.image}
        sx={{p: 2, width: 'auto'}}
        height="194"
        alt={card.title}
      />
      <CardContent
        sx={{
          textAlign: 'center',
          display: 'flex',
          flexFlow: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}
      >
        <Typography variant="h1" color="primary" fontWeight="bold" gutterBottom>
          {card.title}
        </Typography>
        <Typography sx={{fontSize: 20}} component="span" variant="subtitle1" color="text.primary">
          {card.description}
        </Typography>
      </CardContent>
    </Card>
  )
}
