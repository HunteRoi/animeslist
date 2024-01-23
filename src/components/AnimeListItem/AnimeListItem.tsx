import React, { useState, useRef, useEffect } from 'react';
import { Button, ListGroupItem, Container, Col, Row, Form, Badge, Figure, NavLink, Overlay, Tooltip, FloatingLabel } from 'react-bootstrap';
import { isMobile } from 'react-device-detect';
import { confirmAlert } from 'react-confirm-alert';
import { FaRegShareSquare } from 'react-icons/fa';
import { HiShare } from 'react-icons/hi';
import { BsTrash } from 'react-icons/bs';
import { IoIosMore } from 'react-icons/io';

import { AnimeModel, Status, Score } from '../../models';
import { AnimeModalItem } from '../AnimeModalItem';
import { Image } from '../Image/Image';

import './AnimeListItem.css';

type Props = {
  editable: boolean;
  onChange: (value: string | undefined | boolean | null | Status | Score | string[], propname: string) => void;
  onDelete: () => void;
} & AnimeModel;

export const AnimeListItem: React.FC<Props> = ({
  editable,
  onChange,
  onDelete,
  id,
  image,
  name_english,
  name_japanese,
  comments,
  types,
  score,
  status,
  link,
  isPublic,
  ...rest}) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const target = useRef(null);
    const [isSuccess, setSuccess] = useState(false);

    const openLink = () => {
      window.open(link);
    };

    const handleDelete = () => {
      if (!editable) return;

      confirmAlert({
        title: 'Delete ' + name_english,
        message: 'Are you sure you want to delete this?',
        buttons: [
          { label: 'YES', onClick: onDelete },
          { label: 'NO', onClick: () => console.debug('User cancelled deletion')}
        ]
      });
    };

    const copyToClipboard = async () => {
      console.debug('Using navigator.clipboard');

      const text = name_english
        ? `An anime from my personal AnimesList!\r\n${name_english} : ${link ?? 'no link found'}`
        : '';
      await navigator.clipboard.writeText(text);
      setSuccess(true);
    };

    const shareExternal = async () => {
      if (navigator.share) {
        console.debug('Using navigator.share');

        await navigator.share({
          title: name_english,
          text: `An anime from my personal AnimesList!\r\n${name_english}`,
          url: link,
        });
        setSuccess(true);
      } else {
        console.debug('No navigator.share, defaulting to navigator.clipboard');

        await copyToClipboard();
      }
    };

    useEffect(() => {
      if (isSuccess) {
        setTimeout(() => setSuccess(false), 1250);
      }
    }, [isSuccess]);

    return (
      <ListGroupItem key={id} className='mt-3 pb-3'>
        <Container fluid>
          <Row>
            <Col md='auto'>
              <Figure>
                {image && (
                  <NavLink onClick={handleShow}>
                    <Image src={image} alt={id + '-image'} rounded>
                      {Status[status as keyof typeof Status]}
                    </Image>
                  </NavLink>
                )}
                <Figure.Caption>
                  Score: {Score[score as keyof typeof Score]}
                </Figure.Caption>
              </Figure>
            </Col>

            <Col>
              <NavLink onClick={handleShow}>
                <h5 className='text-uppercase'>{name_english}</h5>
              </NavLink>
              
              <Form.Text>
                <h6 className='subtitle mb-2'>{name_japanese}</h6>
              </Form.Text>
              
              {types && <Form.Text>
                {types.map((t) => (
                  <Badge pill className='me-1' key={t}>
                    {t}
                  </Badge>
                ))}
              </Form.Text>}
              
              <Form.Group controlId={id + '-ispublic'} style={{ margin: '.5em 0 .3em 0', display: 'flex', flexDirection: 'row', gap: '1em', alignItems: 'center', justifyContent: 'center' }}>
                <Form.Label as={'span'} style={{ marginBottom: '-.25em' }}>Is public</Form.Label>
                <Form.Check
                  disabled={!editable}
                  style={{ paddingTop: '7px' }}
                  type='switch'
                  checked={isPublic}
                  onChange={(e) => onChange(e.currentTarget.checked, 'isPublic')}
                />
              </Form.Group>
              
              <FloatingLabel controlId={id + '-comments'} label='Comments' className='mt-2 mb-3'>
                <Form.Control
                  as='textarea'
                  disabled={!editable}
                  placeholder='Comments'
                  value={comments}
                  onChange={(e) => onChange(e.currentTarget.value, 'comments')}
                />
              </FloatingLabel>
              
              <>
                <Button
                  variant='primary'
                  onClick={handleShow}
                  title='View more information about this item'
                  className='btn-item'
                >
                  <IoIosMore />
                </Button>
                {' '}
                <Button
                  variant='secondary'
                  onClick={isMobile ? shareExternal : copyToClipboard}
                  title='Share this anime'
                  ref={target}
                  className='btn-item'
                >
                  <HiShare />
                </Button>
                
                <Overlay
                  target={target.current}
                  show={isSuccess}
                  placement='right'
                >
                  {(props) => (
                    <Tooltip id='copy-tooltip' {...props}>
                      Copied!
                    </Tooltip>
                  )}
                </Overlay>
                {' '}
                <Button
                  variant='secondary'
                  onClick={openLink}
                  title="Open the entry's link"
                  className='btn-item'
                >
                  <FaRegShareSquare />
                </Button>
                {' '}
                {editable && <Button
                  disabled={!editable}
                  variant='danger'
                  onClick={handleDelete}
                  title='Delete this anime'
                  className='btn-item'
                >
                  <BsTrash />
                </Button>}
              </>
            </Col>
          </Row>
        </Container>

        <AnimeModalItem
          editable={editable}
          show={show}
          handleClose={handleClose}
          onDelete={handleDelete}
          onChange={onChange}
          id={id}
          image={image}
          name_english={name_english}
          name_japanese={name_japanese}
          comments={comments}
          types={types}
          score={score}
          status={status}
          link={link}
          isPublic={isPublic}
          {...rest}
        />
      </ListGroupItem>
    );
};
